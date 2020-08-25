import * as functions from '@client/functions'
import { Props } from '@client/Props'
import { State } from '@client/State'
import { StepToShow } from '@client/StepsToShow'
import { WatcherClientCreateParams } from '@client/types/WatcherClientCreateParams'
import { validateEmail } from '@shared/utils/validateEmail'

export const createWatcher = async (
  props: Readonly<Props>,
  state: Readonly<State>
): Promise<{ readonly stepToShow: StepToShow }> => {
  const apiUrl = props.clientSettings.apiUrl
  if (!validateEmail(state.email)) {
    throw new Error('Email is not valid')
  }

  const {
    emailToContinueWatching,
    arrival,
    departure,
    origin,
    destination,
    flightType,
    lang,
    lowestPrice,
  } = props.appConfig

  const token = props.clientSettings.token
  const result = await functions.getWatchersCountOnEmail(token, apiUrl, state.email)
  if (result === undefined) {
    props.handleError(new Error('API send watchers count on email error.'), { props, state })

    return { stepToShow: StepToShow.error }
  }
  if (result.limit === 1 && result.count === 1) {
    return { stepToShow: StepToShow.removeWatcher }
  }
  if (result.limit > 1 && result.limit === result.count) {
    const sendListResult = await functions.sendWatchersList(token, apiUrl, state.email, lang)

    if (!sendListResult) {
      props.handleError(new Error('API send watcher list error.'), { props, state })

      return { stepToShow: StepToShow.error }
    }

    return { stepToShow: StepToShow.removeMoreWatchers }
  }

  const watcherCreateParams: WatcherClientCreateParams = {
    email: emailToContinueWatching ? emailToContinueWatching.toString() : state.email,
    lang: lang.toString(),
    priceLimit: lowestPrice.toString(),
    arrival: arrival ? arrival.toString() : undefined,
    departure: departure.toString(),
    destination: destination.toString(),
    origin: origin.toString(),
    flightType: flightType,
  }
  const createResult = await functions.createWatcher(token, apiUrl, watcherCreateParams)
  if (!createResult) {
    props.handleError(new Error('API create watcher error.'), { props, state })

    return { stepToShow: StepToShow.error }
  }

  return { stepToShow: StepToShow.createWatcherDone }
}
