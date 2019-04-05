import { StepToShow } from '@client/StepsToShow'
import { ValidNumber } from '@shared/validObjects/ValidNumber'
import { ValidString } from '@shared/validObjects/ValidString'

export interface ClientSettings {
  readonly token: string
  readonly keepMinimalisedInDays: ValidNumber
  readonly initStep: StepToShow | undefined
  readonly apiUrl: ValidString
}
