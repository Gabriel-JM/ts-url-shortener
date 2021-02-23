import { UrlValidator } from '.'

const makeSut = () => new UrlValidator()

describe('URL Validator', () => {
  it('should return false, if an invalid URL is provided', () => {
    const sut = makeSut()

    const invalidUrls = [
      '://url',
      'http:lkj',
      'http://',
      'http://.com',
      'htt:/hjfd.br',
      'http//url.com',
      'https://..org',
      'ran://url.com',
      'url.com',
      'https://url:.com',
      'http://url:8080.com'
    ]

    for(const url of invalidUrls) {
      expect(sut.isValid(url)).toBe(false)
    }
  })

  it('should return true, if a valid URL is provided', () => {
    const sut = makeSut()

    const validUrls = [
      'http://url.org',
      'https://url.com/12',
      'http://url.net.com/path/',
      'https://url.com.br/path/path-2/123abc'
    ]

    for(const url of validUrls) {
      expect(sut.isValid(url)).toBe(true)
    }
  })
})
