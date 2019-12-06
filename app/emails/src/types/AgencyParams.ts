import { ValidEmail, ValidNumber, ValidUrl } from '@travelport-czech/valid-objects-ts'

export interface AgencyParams {
  readonly emailFrom: ValidEmail
  readonly emailReplyTo: ValidEmail
  readonly dealerId?: ValidNumber
  readonly frontendUrl: ValidUrl
}
