import { ValidEmail } from '@ceesystems/valid-objects-ts'
import * as functions from '@client/functions'
import { Props } from '@client/Props'
import { State } from '@client/State'

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

export const deleteWatcherById = async (props: Readonly<Props>): Promise<boolean> => {
  const apiUrl = props.clientSettings.apiUrl
  if (!props.appConfig.watcherIdToDelete) {
    return false
  }
  if (!props.appConfig.emailForWatcherDelete) {
    return false
  }

  return functions.deleteWatcher(
    props.clientSettings.token,
    apiUrl,
    props.appConfig.watcherIdToDelete,
    props.appConfig.emailForWatcherDelete
  )
}
