import { Location } from 'src/shared/validObjects/Location'
import { ValidDate } from 'src/shared/validObjects/ValidDate'
import { ValidLocationCodeList } from 'src/shared/validObjects/ValidLocationCodeList'

export interface FlightParams {
  readonly origin: ValidLocationCodeList
  readonly destination: ValidLocationCodeList
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
  readonly departure: ValidDate
  readonly arrival?: ValidDate
}
