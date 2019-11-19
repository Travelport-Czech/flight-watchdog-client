import { FlightType } from '@emails/types/FlightType'
import { ValidDate, ValidDateTime, ValidIATALocationList, ValidPrice } from '@travelport-czech/valid-objects-ts'

export interface SearchResult {
  readonly price?: ValidPrice
  readonly created: ValidDateTime
  readonly origin: ValidIATALocationList
  readonly destination: ValidIATALocationList
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly flightType: FlightType
}
