import { StepToShow } from '@client/StepsToShow'
import { ValidString } from '@travelport-czech/valid-objects-ts'

export interface ClientSettings {
  readonly token: string
  readonly initStep: StepToShow | undefined
  readonly apiUrl: ValidString
  readonly analyticsId?: ValidString
  readonly sentryDns?: ValidString
}
