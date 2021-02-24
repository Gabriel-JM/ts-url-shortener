import { ExpirationValidator } from '.'

const makeSut = () => new ExpirationValidator()

describe('Expriration Validator', () => {
  it('should return false, if the current date is greater then the expiration date', () => {
    const expirationDate = '2021-01-09'
    const sut = makeSut()

    const isValid = sut.validate(new Date(), expirationDate)

    expect(isValid).toBe(false)
  })

  it('should return true, if the current date is lower then the expiration date', () => {
    const expirationDate = '2021-03-01'
    const sut = makeSut()

    const isValid = sut.validate(new Date(), expirationDate)

    expect(isValid).toBe(true)
  })
})
