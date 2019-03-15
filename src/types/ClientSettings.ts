import { StepToShow } from 'src/StepsToShow'
import { ValidNumber } from 'src/validObjects/ValidNumber'

export interface ClientSettings {
  readonly token: string
  readonly keepMinimalisedInDays: ValidNumber
  readonly initStep: StepToShow
}
