import { ValidDate } from 'src/client/validObjects/ValidDate'
import { ValidEmail } from 'src/client/validObjects/ValidEmail'
import { ValidLocationCodeList } from 'src/client/validObjects/ValidLocationCodeList'
import { ValidWatcherId } from 'src/client/validObjects/ValidWatcherId'

export interface GolUrlParams {
  readonly returnTicket: boolean
  readonly origin: ValidLocationCodeList
  readonly destination: ValidLocationCodeList
  readonly departure: ValidDate
  readonly arrival: ValidDate
  readonly step: boolean
  readonly emailToContinueWatching?: ValidEmail
  readonly watcherIdToDelete?: ValidWatcherId
  readonly email?: ValidEmail
}
