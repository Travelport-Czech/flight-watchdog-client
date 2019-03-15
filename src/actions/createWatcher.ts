import * as functions from 'src/functions'
import { Props } from 'src/Props'
import { State } from 'src/State'
import { StepToShow } from 'src/StepsToShow'
import { WatcherClientCreateParams } from 'src/types/WatcherClientCreateParams'
import { parseGolUrl } from 'src/utils/parseGolUrl'
import { validateEmail } from 'src/utils/validateEmail'

export const createWatcher = async (
  props: Readonly<Props>,
  state: Readonly<State>
): Promise<{ readonly stepToShow: StepToShow }> => {
  const apiUrl = props.clientSettings.apiUrl
  if (!validateEmail(state.email)) {
    throw new Error('Email is not valid')
  }

  if (!state.golUrlParams) {
    throw new Error('GolUrlParams is not valid')
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

  const golUrlParams = parseGolUrl(props.golUrl)

  if (!golUrlParams) {
    return { stepToShow: StepToShow.error }
  }

  const watcherCreateParams: WatcherClientCreateParams = {
    email: state.golUrlParams.emailToContinueWatching
      ? state.golUrlParams.emailToContinueWatching.toString()
      : state.email,
    lang: props.lang.toString(),
    priceLimit: props.price.toString(),
    arrival: golUrlParams.arrival.toString(),
    departure: golUrlParams.departure.toString(),
    destination: golUrlParams.destination.toString(),
    origin: golUrlParams.origin.toString()
  }
  const createResult = await functions.createWatcher(token, apiUrl, watcherCreateParams)
  if (!createResult) {
    return { stepToShow: StepToShow.error }
  }

  return { stepToShow: StepToShow.createWatcherDone }
}
