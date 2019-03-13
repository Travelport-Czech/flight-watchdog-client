import { Location } from 'src/validObjects/Location'
import { ValidDate } from 'src/validObjects/ValidDate'
import { ValidLocationCodeList } from 'src/validObjects/ValidLocationCodeList'

export interface FlightParams {
  readonly origin: ValidLocationCodeList
  readonly destination: ValidLocationCodeList
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
  readonly departure: ValidDate
  readonly arrival: ValidDate
}
