import * as functions from 'src/client/functions'
import { Props } from 'src/client/Props'
import { State } from 'src/client/State'
import { StepToShow } from 'src/client/StepsToShow'
import { WatcherClientCreateParams } from 'src/client/types/WatcherClientCreateParams'
import { validateEmail } from 'src/client/utils/validateEmail'

export const createWatcher = async (
  props: Readonly<Props>,
  state: Readonly<State>
): Promise<{ readonly stepToShow: StepToShow }> => {
  const apiUrl = props.clientSettings.apiUrl
  if (!validateEmail(state.email)) {
    throw new Error('Email is not valid')
  }

  const token = props.clientSettings.token
  const result = await functions.getWatchersCountOnEmail(token, apiUrl, state.email)
  if (result === undefined) {
    return { stepToShow: StepToShow.error }
  }
  if (result.limit === 1 && result.count === 1) {
    return { stepToShow: StepToShow.removeWatcher }
  }
  if (result.limit > 1 && result.limit === result.count) {
    const sendListResult = await functions.sendWatchersList(token, apiUrl, state.email, props.lang)

    if (!sendListResult) {
      return { stepToShow: StepToShow.error }
    }

    return { stepToShow: StepToShow.removeMoreWatchers }
  }

  const { emailToContinueWatching, arrival, departure, origin, destination, flightType } = props.appConfig

  const watcherCreateParams: WatcherClientCreateParams = {
    email: emailToContinueWatching ? emailToContinueWatching.toString() : state.email,
    lang: props.lang.toString(),
    priceLimit: props.price.toString(),
    arrival: arrival ? arrival.toString() : undefined,
    departure: departure.toString(),
    destination: destination.toString(),
    origin: origin.toString(),
    flightType: flightType
  }
  const createResult = await functions.createWatcher(token, apiUrl, watcherCreateParams)
  if (!createResult) {
    return { stepToShow: StepToShow.error }
  }

  return { stepToShow: StepToShow.createWatcherDone }
}
