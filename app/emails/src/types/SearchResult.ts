import { ValidDate, ValidDateTime, ValidIATALocationList, ValidPrice } from '@ceesystems/valid-objects-ts'
import { FlightType } from '@emails/types/FlightType'

export interface SearchResult {
  readonly price?: ValidPrice
  readonly created: ValidDateTime
  readonly origin: ValidIATALocationList
  readonly destination: ValidIATALocationList
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly flightType: FlightType
}
