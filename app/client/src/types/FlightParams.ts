import { ValidDate, ValidIATALocationList } from '@ceesystems/valid-objects-ts'
import { Location } from '@shared/types/Location'

export interface FlightParams {
  readonly origin: ValidIATALocationList
  readonly destination: ValidIATALocationList
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly flightType: 'oneway' | 'return'
}
