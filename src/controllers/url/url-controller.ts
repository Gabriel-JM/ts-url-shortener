import { IUrlRepository } from '../../protocols/domain'
import { HttpRequest } from '../../protocols/infra'
import { IHashGenerator, IUrlValidator } from '../../protocols/utils'
import { IExpirationValidator } from '../../protocols/utils/expiration-validator'
import { fifteenDaysInMilliseconds } from '../../resources/constants'
import { HttpResponse } from '../../resources/http/http-response'

export class UrlController {
  constructor(
    private readonly repository: IUrlRepository,
    private readonly urlValidator: IUrlValidator,
    private readonly expirationValidator: IExpirationValidator,
    private readonly hashGenerator: IHashGenerator
  ) {}

  async show(request: HttpRequest) {
    try {
      const { hash } = request.params

      const shortenedUrl = await this.repository.findByHash(hash)

      if(!shortenedUrl) {
        return HttpResponse.notFound({
          field: 'url',
          error: 'URL not found or expired'
        })
      }

      const isValid = this.expirationValidator.validate(
        new Date(),
        shortenedUrl.expirationDate || ''
      )

      if(!isValid) {
        await this.repository.delete(shortenedUrl.id as number)
        return HttpResponse.notFound({
          field: 'url',
          error: 'URL not found or expired'
        })
      }

      return HttpResponse.ok({ redirect: shortenedUrl.url })
    } catch(err) {
      return HttpResponse.serverError({
        field: '',
        error: err
      })
    }
  }

  async create(request: HttpRequest) {
    try {
      const { url } = request.body as { url: string }

      const isUrlValid = this.urlValidator.isValid(url)

      if(!isUrlValid) {
        return HttpResponse.badRequest({
          field: 'url',
          error: 'Invalid URL format'
        })
      }

      const urlRegistry = await this.repository.findByUrl(url)

      if(urlRegistry) {
        return HttpResponse.ok({
          url: `${request.address}/${urlRegistry.hash}`
        })
      }

      const hash = this.hashGenerator.generate()

      const [expirationDate] = new Date(
        new Date().getTime() + fifteenDaysInMilliseconds
      ).toISOString().split('T')

      const shortenedUrl = await this.repository.save({ url, hash, expirationDate })

      return HttpResponse.ok({
        url: `${request.address}/${shortenedUrl.hash}`
      })
    } catch(err) {
      return HttpResponse.serverError({
        field: '',
        error: err
      })
    }
  }
}
