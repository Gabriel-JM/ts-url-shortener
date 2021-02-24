import { IUrlRepository } from '../../protocols/domain'
import { HttpRequest } from '../../protocols/infra'
import { ShortenedUrl } from '../../protocols/models'
import { IUrlValidator } from '../../protocols/utils'
import { HttpResponse } from '../../resources/http/http-response'

export class UrlController {
  constructor(
    private readonly repository: IUrlRepository,
    private readonly urlValidator: IUrlValidator
  ) {}

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

      const shortenedUrl = await this.repository.save({ url })

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
