import { ValidDate } from 'src/shared/validObjects/ValidDate'
import { ValidEmail } from 'src/shared/validObjects/ValidEmail'
import { ValidLanguage } from 'src/shared/validObjects/ValidLanguage'
import { ValidLocationCodeList } from 'src/shared/validObjects/ValidLocationCodeList'
import { ValidPrice } from 'src/shared/validObjects/ValidPrice'
import { ValidWatcherId } from 'src/shared/validObjects/ValidWatcherId'

export interface AppConfig {
  readonly flightType: 'return' | 'oneway'
  readonly origin: ValidLocationCodeList
  readonly destination: ValidLocationCodeList
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly emailToContinueWatching?: ValidEmail
  readonly watcherIdToDelete?: ValidWatcherId
  readonly emailForWatcherDelete?: ValidEmail
  readonly customerEmail?: ValidEmail
  readonly lowestPrice: ValidPrice
  readonly lang: ValidLanguage
}
