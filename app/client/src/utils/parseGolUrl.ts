import { ValidDate, ValidEmail, ValidIATALocationList, ValidString } from '@ceesystems/valid-objects-ts'
import { getUrlParameterValue } from '@client/utils/getUrlParameterValue'

export const parseGolUrl = (
  url: string
):
  | undefined
  | {
      readonly flightType: 'return' | 'oneway'
      readonly origin: ValidIATALocationList
      readonly destination: ValidIATALocationList
      readonly departure: ValidDate
      readonly arrival?: ValidDate
      readonly emailToContinueWatching?: ValidEmail
      readonly watcherIdToDelete?: ValidString
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

    // ignore format 2019-07-14T09:00:00
    if (origin.includes('T') || destination.includes('T')) {
      return
    }

    return {
      arrival: new ValidDate(arrival),
      departure: new ValidDate(departure),
      destination: new ValidIATALocationList(destination),
      emailForWatcherDelete: email ? new ValidEmail(email) : undefined,
      emailToContinueWatching: emailToContinueWatching ? new ValidEmail(emailToContinueWatching) : undefined,
      origin: new ValidIATALocationList(origin),
      flightType: 'return',
      watcherIdToDelete: watcherIdToDelete ? new ValidString(watcherIdToDelete) : undefined
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
      destination: new ValidIATALocationList(destination),
      emailForWatcherDelete: email ? new ValidEmail(email) : undefined,
      emailToContinueWatching: emailToContinueWatching ? new ValidEmail(emailToContinueWatching) : undefined,
      origin: new ValidIATALocationList(origin),
      flightType: 'oneway',
      watcherIdToDelete: watcherIdToDelete ? new ValidString(watcherIdToDelete) : undefined
    }
  }

  return
}
