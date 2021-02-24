import { IUrlRepository } from '../../protocols/domain'
import { HttpRequest } from '../../protocols/infra'
import { ShortenedUrl } from '../../protocols/models'
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

      const isValid = this.expirationValidator.validate(
        new Date(),
        shortenedUrl?.expirationDate || ''
      )

      if(!isValid || !shortenedUrl) {
        return HttpResponse.notFound({
          field: 'url',
          error: 'URL not found or expired'
        })
      }

      return HttpResponse.ok({ url: shortenedUrl?.url })
    } catch(err) {
      return HttpResponse.serverError({
        field: '',
        error: err.message
      })
    }
  }

  async create(request: HttpRequest) {
    try {
      const { url } = request.body as ShortenedUrl

      const isUrlValid = this.urlValidator.isValid(url)

      if(!isUrlValid) {
        return HttpResponse.badRequest({
          field: 'url',
          error: 'Invalid URL format'
        })
      }

      const hash = this.hashGenerator.generate()

      const [expirationDate] = new Date(
        new Date().getTime() + fifteenDaysInMilliseconds
      ).toISOString().split('T')

      const shortenedUrl = await this.repository.save({ url, hash, expirationDate })

      return HttpResponse.ok({
        url: shortenedUrl.url
      })
    } catch(err) {
      return HttpResponse.serverError({
        field: '',
        error: err.message
      })
    }
  }
}
