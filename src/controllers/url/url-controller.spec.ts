import { UrlController } from './url-controller'

function makeSut() {
  const repositorySpy = {
    findByHash: jest.fn(),
    save: jest.fn()
  }

  const urlValidatorSpy = {
    isValid: jest.fn(() => true)
  }

  const expirationValidator = {
    validate: jest.fn()
  }

  const hashGeneratorSpy = {
    generate: () => 'random_text'
  }

  const sut = new UrlController(
    repositorySpy,
    urlValidatorSpy,
    expirationValidator,
    hashGeneratorSpy
  )

  return {
    sut,
    repositorySpy,
    urlValidatorSpy
  }
}

describe('URL Controller', () => {
  describe('Create', () => {
    it('should return a 400 response if an invalid url is provided', async () => {
      const { sut, urlValidatorSpy } = makeSut()
  
      urlValidatorSpy.isValid.mockReturnValueOnce(false)
  
      const request = {
        address: 'http://localhost',
        params: {},
        body: {
          url: 'invalid.url.com'
        }
      }
  
      const response = await sut.create(request)
  
      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        field: 'url',
        error: 'Invalid URL format'
      })
    })
  
    it('should return a 200 response if a valid url is provided', async () => {
      const { sut, repositorySpy } = makeSut()
      const urlValue = { hash: 'any_hash' }
  
      repositorySpy.save.mockResolvedValueOnce(urlValue)
  
      const response = await sut.create({
        address: 'http://localhost',
        params: {},
        body: { url: 'full.url.com' }
      })
  
      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        url: 'http://localhost/any_hash'
      })
    })
  
    it('should return a 500 response if repository throws some error', async () => {
      const { sut, repositorySpy } = makeSut()
      const errorMessage = 'unique constraint error'
  
      repositorySpy.save.mockImplementationOnce(
        () => { throw new Error(errorMessage) }
      )
  
      const response = await sut.create({
        address: 'http://localhost',
        params: {},
        body: { url: 'any.url.com' }
      })
  
      expect(response.status).toBe(500)
      expect(response.body).toEqual({
        field: '',
        error: errorMessage
      })
    })
  })
})
