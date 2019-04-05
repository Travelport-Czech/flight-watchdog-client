import { Location } from '@shared/validObjects/Location'
import { ValidDate } from '@shared/validObjects/ValidDate'
import { ValidLocationCodeList } from '@shared/validObjects/ValidLocationCodeList'

export interface FlightParams {
  readonly origin: ValidLocationCodeList
  readonly destination: ValidLocationCodeList
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly flightType: 'oneway' | 'return'
}
