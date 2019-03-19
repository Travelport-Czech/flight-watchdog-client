import * as functions from 'src/client/functions'
import { Props } from 'src/client/Props'
import { State } from 'src/client/State'
import { ValidEmail } from 'src/shared/validObjects/ValidEmail'

export const deleteWatcherByEmail = async (props: Readonly<Props>, state: Readonly<State>): Promise<boolean> => {
  const apiUrl = props.clientSettings.apiUrl
  const email = new ValidEmail(state.email)
  const idList = await functions.getWatchersOnEmail(props.clientSettings.token, apiUrl, email)
  if (idList === undefined) {
    return false
  }

  if (idList.length > 0) {
    return functions.deleteWatcher(props.clientSettings.token, apiUrl, idList[0], email)
  }

  return false
}

export const deleteWatcherById = async (props: Readonly<Props>, state: Readonly<State>): Promise<boolean> => {
  const apiUrl = props.clientSettings.apiUrl
  if (!state.golUrlParams) {
    return false
  }
  if (!state.golUrlParams.watcherIdToDelete) {
    return false
  }
  if (!state.golUrlParams.email) {
    return false
  }

  return functions.deleteWatcher(
    props.clientSettings.token,
    apiUrl,
    state.golUrlParams.watcherIdToDelete,
    state.golUrlParams.email
  )
}
