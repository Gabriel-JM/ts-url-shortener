import validator from 'validator'

export class UrlValidator {
  isValid(url: string) {
    return validator.isURL(url, {
      protocols: ['http', 'https'],
      require_protocol: true,
      require_valid_protocol: true
    })
  }
}
