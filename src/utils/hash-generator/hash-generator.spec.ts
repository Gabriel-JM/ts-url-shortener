import { HashGenerator } from '.'

const makeSut = () => new HashGenerator()

describe('Hash Generator', () => {
  it('should return random generated text with length between 5 and 10', () => {
    const sut = makeSut()
    
    const randomTexts = [
      sut.generate(),
      sut.generate(),
      sut.generate()
    ]

    for(const text of randomTexts) {
      expect(text.length).toBeGreaterThanOrEqual(5)
      expect(text.length).toBeLessThanOrEqual(10)
    }
  })
})
