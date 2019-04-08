import { ValidEmail } from '@shared/validObjects/ValidEmail'
import { ValidNumber } from '@shared/validObjects/ValidNumber'
import { ValidUrl } from '@shared/validObjects/ValidUrl'

export interface AgencyParams {
  readonly emailFrom: ValidEmail
  readonly dealerId?: ValidNumber
  readonly frontendUrl: ValidUrl
}
