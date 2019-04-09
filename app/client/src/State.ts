import { StepToShow } from '@client/StepsToShow'
import { Location } from '@shared/types/Location'

export interface State {
  readonly stepToShow: StepToShow
  readonly email: string
  readonly showBadEmailError: boolean
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
}
