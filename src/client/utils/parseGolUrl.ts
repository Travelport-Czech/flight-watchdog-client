import { GolUrlParams } from 'src/client/types/GolUrlParams'
import { ValidDate } from 'src/client/validObjects/ValidDate'
import { ValidEmail } from 'src/client/validObjects/ValidEmail'
import { ValidLocationCodeList } from 'src/client/validObjects/ValidLocationCodeList'
import { ValidWatcherId } from 'src/client/validObjects/ValidWatcherId'

const getUrlParameterValue = (url: string, key: string): string => {
  const urlParts = url.split('&')

  return urlParts.reduce((acc: string, current: string): string => {
    if (current.includes(key)) {
      return decodeURIComponent(current.split('=')[1])
    }

    return acc
  }, '')
}

export const parseGolUrl = (url: string): GolUrlParams | undefined => {
  const returnTicket = getUrlParameterValue(url, 'returnTicket') === 'on'
  const origin = getUrlParameterValue(url, 'flights[0][origin]=')
  const destination = getUrlParameterValue(url, 'flights[0][destination]=')
  const departure = getUrlParameterValue(url, 'flights[0][departureDate]=')
  const arrival = getUrlParameterValue(url, 'flights[1][departureDate]=')
  const step = getUrlParameterValue(url, 'step') === 'ChooseFromFour'
  const emailToContinueWatching = getUrlParameterValue(url, 'flightWatchdogContinue')
  const watcherIdToDelete = getUrlParameterValue(url, 'flightWatchdogDelete')
  const email = getUrlParameterValue(url, 'email')

  if (!returnTicket || !origin || !destination || !departure || !arrival || !step) {
    return
  }

  return {
    arrival: new ValidDate(arrival),
    departure: new ValidDate(departure),
    destination: new ValidLocationCodeList(destination),
    email: email ? new ValidEmail(email) : undefined,
    emailToContinueWatching: emailToContinueWatching ? new ValidEmail(emailToContinueWatching) : undefined,
    origin: new ValidLocationCodeList(origin),
    returnTicket,
    step,
    watcherIdToDelete: watcherIdToDelete ? new ValidWatcherId(watcherIdToDelete) : undefined
  }
}
