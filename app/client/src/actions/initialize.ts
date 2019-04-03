import { Consts } from 'client/Consts'
import { getDestinationNames, isAllowedToAddWatcher } from 'client/functions'
import { Props } from 'client/Props'
import { State } from 'client/State'
import { StepToShow } from 'client/StepsToShow'
import * as Cookies from 'js-cookie'

export const initialize = async (props: Readonly<Props>, state: Readonly<State>): Promise<State | undefined> => {
  const apiUrl = props.clientSettings.apiUrl
  if (state.stepToShow !== StepToShow.none) {
    throw new Error('Initialize must call once at start.')
  }
  const token = props.clientSettings.token
  const { origin, destination, emailToContinueWatching, watcherIdToDelete, lang, customerEmail } = props.appConfig

  if (!token) {
    return
  }

  const canCreateWatcher = await isAllowedToAddWatcher(token, apiUrl)
  if (!canCreateWatcher) {
    return
  }

  const originLocationList = await getDestinationNames(token, apiUrl, origin, lang)
  const destinationLocationList = await getDestinationNames(token, apiUrl, destination, lang)

  const defaultState = {
    destinationLocationList,
    email: customerEmail ? customerEmail.toString() : '',
    golUrlParams: props.appConfig,
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

  if (emailToContinueWatching) {
    return {
      ...defaultState,
      email: emailToContinueWatching.toString(),
      stepToShow: StepToShow.continueWatching
    }
  }

  if (watcherIdToDelete) {
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
