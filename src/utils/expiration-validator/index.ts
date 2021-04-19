import { fifteenDaysInMilliseconds } from '../../resources/constants'

export class ExpirationValidator {
  validate(currentDate: Date, expirationIsoString: string) {
    const formatedExpDate = expirationIsoString.includes('T')
      ? expirationIsoString.split('T')[0]
      : expirationIsoString

    const date = new Date(formatedExpDate + 'T00:00:00')
    const expirationDate = new Date(
      date.getTime() + fifteenDaysInMilliseconds
    )

    console.log(currentDate, expirationDate)

    return currentDate < expirationDate
  }
}
