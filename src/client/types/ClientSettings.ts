import { StepToShow } from 'src/client/StepsToShow'
import { ValidNumber } from 'src/client/validObjects/ValidNumber'
import { ValidString } from 'src/client/validObjects/ValidString'

export interface ClientSettings {
  readonly token: string
  readonly keepMinimalisedInDays: ValidNumber
  readonly initStep: StepToShow | undefined
  readonly apiUrl: ValidString
}
