import { StepToShow } from '@client/StepsToShow'
import { ValidNumber, ValidString } from '@travelport-czech/valid-objects-ts'

export interface ClientSettings {
  readonly token: string
  readonly keepMinimalisedInDays: ValidNumber
  readonly initStep: StepToShow | undefined
  readonly apiUrl: ValidString
  readonly analyticsId?: ValidString
  readonly sentryDns?: ValidString
}
