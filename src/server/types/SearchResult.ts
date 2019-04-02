import { ValidDate } from 'src/shared/validObjects/ValidDate'
import { ValidDateTime } from 'src/shared/validObjects/ValidDateTime'
import { ValidFlightType } from 'src/shared/validObjects/ValidFlightType'
import { ValidLocationCodeList } from 'src/shared/validObjects/ValidLocationCodeList'
import { ValidPrice } from 'src/shared/validObjects/ValidPrice'

export interface SearchResult {
  readonly price?: ValidPrice
  readonly created: ValidDateTime
  readonly origin: ValidLocationCodeList
  readonly destination: ValidLocationCodeList
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly flightType: ValidFlightType
}
