import { StepToShow } from '@client/StepsToShow'
import { ValidNotEmptyString } from '@travelport-czech/valid-objects-ts'

export interface ClientSettings {
  readonly token: string
  readonly initStep: StepToShow | undefined
  readonly apiUrl: ValidNotEmptyString
  readonly analyticsId?: ValidNotEmptyString
  readonly sentryDns?: ValidNotEmptyString
}
