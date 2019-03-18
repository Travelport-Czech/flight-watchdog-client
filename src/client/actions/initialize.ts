import * as Cookies from 'js-cookie'
import { Consts } from 'src/client/Consts'
import { getDestinationNames, isAllowedToAddWatcher } from 'src/client/functions'
import { Props } from 'src/client/Props'
import { State } from 'src/client/State'
import { StepToShow } from 'src/client/StepsToShow'
import { parseGolUrl } from 'src/client/utils/parseGolUrl'

export const initialize = async (props: Readonly<Props>, state: Readonly<State>): Promise<State | undefined> => {
  const apiUrl = props.clientSettings.apiUrl
  if (state.stepToShow !== StepToShow.none) {
    throw new Error('Initialize must call once at start.')
  }
  const token = props.clientSettings.token
  const lang = props.lang

  if (!token) {
    return
  }

  const golUrlParams = parseGolUrl(props.golUrl)
  if (!golUrlParams) {
    return
  }

  const canCreateWatcher = await isAllowedToAddWatcher(token, apiUrl)
  if (!canCreateWatcher) {
    return
  }

  const originLocationList = await getDestinationNames(token, apiUrl, golUrlParams.origin, lang)
  const destinationLocationList = await getDestinationNames(token, apiUrl, golUrlParams.destination, lang)

  const defaultState = {
    destinationLocationList,
    email: props.userEmail ? props.userEmail.toString() : '',
    golUrlParams,
    originLocationList,
    showBadEmailError: false,
    stepToShow: StepToShow.none
  }

  if (props.clientSettings.initStep) {
    return {
      ...defaultState,
      stepToShow: props.clientSettings.initStep
    }
  }

  if (golUrlParams.emailToContinueWatching) {
    return {
      ...defaultState,
      email: golUrlParams.emailToContinueWatching.toString(),
      stepToShow: StepToShow.continueWatching
    }
  }

  if (golUrlParams.watcherIdToDelete) {
    return {
      ...defaultState,
      stepToShow: StepToShow.removeWatcherById
    }
  }

  const startMinimalized = Cookies.get(Consts.cookieName)

  if (startMinimalized) {
    return {
      ...defaultState,
      stepToShow: StepToShow.minimalized
    }
  }

  return {
    ...defaultState,
    stepToShow: StepToShow.createWatcherAgree
  }
}
