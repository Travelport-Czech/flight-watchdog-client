import { ValidEmail, ValidNumber } from '@travelport-czech/valid-objects-ts'

export interface AgencyParams {
  readonly emailFrom: ValidEmail
  readonly emailReplyTo: ValidEmail
  readonly dealerId?: ValidNumber
  readonly frontendUrl: string
}
