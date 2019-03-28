import { StepToShow } from 'src/client/StepsToShow'
import { Location } from 'src/shared/validObjects/Location'

export interface State {
  readonly stepToShow: StepToShow
  readonly email: string
  readonly showBadEmailError: boolean
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
}
