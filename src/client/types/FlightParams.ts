import { Location } from 'src/client/validObjects/Location'
import { ValidDate } from 'src/client/validObjects/ValidDate'
import { ValidLocationCodeList } from 'src/client/validObjects/ValidLocationCodeList'

export interface FlightParams {
  readonly origin: ValidLocationCodeList
  readonly destination: ValidLocationCodeList
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
  readonly departure: ValidDate
  readonly arrival: ValidDate
}
