import { UrlController } from '../../controllers/url/url-controller'
import { UrlRepository } from '../../repositories/url/url-repository'
import { connectDatabase } from '../../resources/database'
import { ExpirationValidator } from '../../utils/expiration-validator'
import { HashGenerator } from '../../utils/hash-generator'
import { UrlValidator } from '../../utils/url-validator'

export function compose() {
  const knexDB = connectDatabase()
  const urlRepository = new UrlRepository(knexDB)
  const urlValidator = new UrlValidator()
  const expirationValidator = new ExpirationValidator()
  const hashGenerator = new HashGenerator()

  const urlController = new UrlController(
    urlRepository,
    urlValidator,
    expirationValidator,
    hashGenerator
  )

  return urlController
}
