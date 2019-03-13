import { StepToShow } from 'src/StepsToShow'
import { GolUrlParams } from 'src/types/GolUrlParams'
import { Location } from 'src/validObjects/Location'

export interface State {
  readonly stepToShow: StepToShow
  readonly golUrlParams?: GolUrlParams
  readonly email: string
  readonly showBadEmailError: boolean
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
}
