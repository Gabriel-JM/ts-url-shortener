export interface IExpirationValidator {
  validate(currentDate: Date, expirationIsoString: string): boolean
}
