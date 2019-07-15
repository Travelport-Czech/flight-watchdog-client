import { ValidDateTime, ValidEmail, ValidLanguage, ValidPrice, ValidString } from '@ceesystems/valid-objects-ts'
import { FlightParams } from '@emails/types/FlightParams'

export interface WatcherParams extends FlightParams {
  readonly id: ValidString
  readonly email: ValidEmail
  readonly priceLimit: ValidPrice
  readonly lang: ValidLanguage
  readonly created: ValidDateTime
}
