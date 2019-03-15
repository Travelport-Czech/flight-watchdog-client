import { StepToShow } from 'src/StepsToShow'
import { ValidNumber } from 'src/validObjects/ValidNumber'
import { ValidString } from 'src/validObjects/ValidString'

export interface ClientSettings {
  readonly token: string
  readonly keepMinimalisedInDays: ValidNumber
  readonly initStep: StepToShow | undefined
  readonly apiUrl: ValidString
}
