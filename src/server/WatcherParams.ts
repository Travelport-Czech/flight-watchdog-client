import { ValidDate } from 'src/shared/validObjects/ValidDate'
import { ValidDateTime } from 'src/shared/validObjects/ValidDateTime'
import { ValidEmail } from 'src/shared/validObjects/ValidEmail'
import { ValidLanguage } from 'src/shared/validObjects/ValidLanguage'
import { ValidLocationCodeList } from 'src/shared/validObjects/ValidLocationCodeList'
import { ValidPrice } from 'src/shared/validObjects/ValidPrice'
import { ValidWatcherId } from 'src/shared/validObjects/ValidWatcherId'

export interface WatcherParams {
  readonly id: ValidWatcherId
  readonly email: ValidEmail
  readonly origin: ValidLocationCodeList
  readonly destination: ValidLocationCodeList
  readonly departure: ValidDate
  readonly arrival: ValidDate
  readonly priceLimit: ValidPrice
  readonly lang: ValidLanguage
  readonly created: ValidDateTime
}
