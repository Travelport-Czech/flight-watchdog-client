import * as functions from 'src/functions'
import { Props } from 'src/Props'
import { State } from 'src/State'
import { ValidEmail } from 'src/validObjects/ValidEmail'

export const deleteWatcherByEmail = async (props: Readonly<Props>, state: Readonly<State>): Promise<boolean> => {
  const email = new ValidEmail(state.email)
  const idList = await functions.getWatchersOnEmail(props.clientSettings.token, email)
  if (idList === undefined) {
    return false
  }

  if (idList.length > 0) {
    return functions.deleteWatcher(props.clientSettings.token, idList[0], email)
  }

  return false
}

export const deleteWatcherById = async (props: Readonly<Props>, state: Readonly<State>): Promise<boolean> => {
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
    state.golUrlParams.watcherIdToDelete,
    state.golUrlParams.email
  )
}
