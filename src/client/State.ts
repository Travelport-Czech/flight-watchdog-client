import { StepToShow } from 'src/client/StepsToShow'
import { GolUrlParams } from 'src/client/types/GolUrlParams'
import { Location } from 'src/client/validObjects/Location'

export interface State {
  readonly stepToShow: StepToShow
  readonly golUrlParams?: GolUrlParams
  readonly email: string
  readonly showBadEmailError: boolean
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
}
