import {
  ValidDate,
  ValidDateTime,
  ValidEmail,
  ValidIATALocationList,
  ValidLanguage,
  ValidPrice,
  ValidString
} from '@ceesystems/valid-objects-ts'
import { FlightType } from '@emails/types/FlightType'

export interface WatcherParams {
  readonly id: ValidString
  readonly email: ValidEmail
  readonly origin: ValidIATALocationList
  readonly destination: ValidIATALocationList
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly priceLimit: ValidPrice
  readonly lang: ValidLanguage
  readonly created: ValidDateTime
  readonly flightType: FlightType
}
