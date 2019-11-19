import { FlightType } from '@emails/types/FlightType'
import { ValidDate, ValidIATALocationList } from '@travelport-czech/valid-objects-ts'

export interface FlightParams {
  readonly origin: ValidIATALocationList
  readonly destination: ValidIATALocationList
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly flightType: FlightType
}
