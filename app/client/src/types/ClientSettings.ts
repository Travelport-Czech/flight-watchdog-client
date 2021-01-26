import { StepToShow } from '@client/StepsToShow'
import { ValidNotEmptyString, ValidNumber } from '@travelport-czech/valid-objects-ts'

export interface ClientSettings {
  readonly token: string
  readonly keepMinimalisedInDays: ValidNumber
  readonly initStep: StepToShow | undefined
  readonly apiUrl: ValidNotEmptyString
  readonly analyticsId?: ValidNotEmptyString
  readonly sentryDns?: ValidNotEmptyString
}
