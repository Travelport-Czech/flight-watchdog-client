import { FlightParams } from '@emails/types/FlightParams'
import { ValidDateTime, ValidEmail, ValidLanguage, ValidPrice, ValidString } from '@travelport-czech/valid-objects-ts'

export interface WatcherParams extends FlightParams {
  readonly id: ValidString
  readonly email: ValidEmail
  readonly priceLimit: ValidPrice
  readonly lang: ValidLanguage
  readonly created: ValidDateTime
}
