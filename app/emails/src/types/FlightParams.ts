import { ValidDate, ValidIATALocationList } from '@ceesystems/valid-objects-ts'
import { FlightType } from '@emails/types/FlightType'

export interface FlightParams {
  readonly origin: ValidIATALocationList
  readonly destination: ValidIATALocationList
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly flightType: FlightType
}
