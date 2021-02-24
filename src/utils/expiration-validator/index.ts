import { fifteenDaysInMilliseconds } from '../../resources/constants'

export class ExpirationValidator {
  validate(currentDate: Date, expirationIsoString: string) {
    const date = new Date(expirationIsoString + 'T00:00:00')
    const expirationDate = new Date(
      date.getTime() + fifteenDaysInMilliseconds
    )

    return currentDate < expirationDate
  }
}
