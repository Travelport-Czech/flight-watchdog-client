import { ValidDate } from 'shared/validObjects/ValidDate'
import { ValidEmail } from 'shared/validObjects/ValidEmail'
import { ValidLocationCodeList } from 'shared/validObjects/ValidLocationCodeList'
import { ValidWatcherId } from 'shared/validObjects/ValidWatcherId'

const getUrlParameterValue = (url: string, key: string): string => {
  const urlParts = url.split('&')

  return urlParts.reduce((acc: string, current: string): string => {
    if (current.includes(key)) {
      return decodeURIComponent(current.split('=')[1])
    }

    return acc
  }, '')
}

export const parseGolUrl = (
  url: string
):
  | undefined
  | {
      readonly flightType: 'return' | 'oneway'
      readonly origin: ValidLocationCodeList
      readonly destination: ValidLocationCodeList
      readonly departure: ValidDate
      readonly arrival?: ValidDate
      readonly emailToContinueWatching?: ValidEmail
      readonly watcherIdToDelete?: ValidWatcherId
      readonly emailForWatcherDelete?: ValidEmail
    } => {
  if (getUrlParameterValue(url, 'returnTicket') === 'on') {
    const origin = getUrlParameterValue(url, 'flights[0][origin]=')
    const destination = getUrlParameterValue(url, 'flights[0][destination]=')
    const departure = getUrlParameterValue(url, 'flights[0][departureDate]=')
    const arrival = getUrlParameterValue(url, 'flights[1][departureDate]=')
    const step = getUrlParameterValue(url, 'step') === 'ChooseFromFour'
    const emailToContinueWatching = getUrlParameterValue(url, 'flightWatchdogContinue')
    const watcherIdToDelete = getUrlParameterValue(url, 'flightWatchdogDelete')
    const email = getUrlParameterValue(url, 'email')

    if (!origin || !destination || !departure || !arrival || !step) {
      return
    }

    return {
      arrival: new ValidDate(arrival),
      departure: new ValidDate(departure),
      destination: new ValidLocationCodeList(destination),
      emailForWatcherDelete: email ? new ValidEmail(email) : undefined,
      emailToContinueWatching: emailToContinueWatching ? new ValidEmail(emailToContinueWatching) : undefined,
      origin: new ValidLocationCodeList(origin),
      flightType: 'return',
      watcherIdToDelete: watcherIdToDelete ? new ValidWatcherId(watcherIdToDelete) : undefined
    }
  }

  if (getUrlParameterValue(url, 'returnTicket') === '') {
    const origin = getUrlParameterValue(url, 'flights[0][origin]=')
    const destination = getUrlParameterValue(url, 'flights[0][destination]=')
    const departure = getUrlParameterValue(url, 'flights[0][departureDate]=')
    const step = getUrlParameterValue(url, 'step') === 'ChooseFromFour'
    const emailToContinueWatching = getUrlParameterValue(url, 'flightWatchdogContinue')
    const watcherIdToDelete = getUrlParameterValue(url, 'flightWatchdogDelete')
    const email = getUrlParameterValue(url, 'email')

    if (!origin || !destination || !departure || !step) {
      return
    }

    return {
      departure: new ValidDate(departure),
      destination: new ValidLocationCodeList(destination),
      emailForWatcherDelete: email ? new ValidEmail(email) : undefined,
      emailToContinueWatching: emailToContinueWatching ? new ValidEmail(emailToContinueWatching) : undefined,
      origin: new ValidLocationCodeList(origin),
      flightType: 'oneway',
      watcherIdToDelete: watcherIdToDelete ? new ValidWatcherId(watcherIdToDelete) : undefined
    }
  }

  return
}
