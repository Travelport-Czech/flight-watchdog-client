import { ValidDate } from 'src/shared/validObjects/ValidDate'
import { ValidEmail } from 'src/shared/validObjects/ValidEmail'
import { ValidLocationCodeList } from 'src/shared/validObjects/ValidLocationCodeList'
import { ValidWatcherId } from 'src/shared/validObjects/ValidWatcherId'

export interface AppConfig {
  readonly flightType: 'return' | 'oneway'
  readonly origin: ValidLocationCodeList
  readonly destination: ValidLocationCodeList
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly step: boolean
  readonly emailToContinueWatching?: ValidEmail
  readonly watcherIdToDelete?: ValidWatcherId
  readonly email?: ValidEmail
}
