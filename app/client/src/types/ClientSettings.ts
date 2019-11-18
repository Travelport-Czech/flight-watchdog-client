import { ValidString } from '@ceesystems/valid-objects-ts'
import { StepToShow } from '@client/StepsToShow'

export interface ClientSettings {
  readonly token: string
  readonly initStep: StepToShow | undefined
  readonly apiUrl: ValidString
  readonly analyticsId?: ValidString
  readonly sentryDns?: ValidString
}
