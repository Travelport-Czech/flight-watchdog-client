import { StepToShow } from 'src/client/StepsToShow'
import { ValidNumber } from 'src/shared/validObjects/ValidNumber'
import { ValidString } from 'src/shared/validObjects/ValidString'

export interface ClientSettings {
  readonly token: string
  readonly keepMinimalisedInDays: ValidNumber
  readonly initStep: StepToShow | undefined
  readonly apiUrl: ValidString
}
