import { FlightParams } from '@emails/types/FlightParams'
import {
  ValidDateTime,
  ValidEmail,
  ValidLanguage,
  ValidNotEmptyString,
  ValidPrice
} from '@travelport-czech/valid-objects-ts'

export interface WatcherParams extends FlightParams {
  readonly id: ValidNotEmptyString
  readonly email: ValidEmail
  readonly priceLimit: ValidPrice
  readonly lang: ValidLanguage
  readonly created: ValidDateTime
}
