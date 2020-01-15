import { getUrlParameterValue } from '@client/utils/getUrlParameterValue'
import { urlParamsConst } from '@shared/utils/consts'
import { ValidDate, ValidEmail, ValidIATALocationList } from '@travelport-czech/valid-objects-ts'

interface FlightData {
  readonly flightType: 'return' | 'oneway'
  readonly origin: ValidIATALocationList
  readonly destination: ValidIATALocationList
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly emailToContinueWatching?: ValidEmail
}

export const parseGolUrl = (url: string): undefined | FlightData => {
  if (getUrlParameterValue(url, 'returnTicket') === 'on') {
    return parseReturnFlight(url)
  }

  if (getUrlParameterValue(url, 'returnTicket') === '') {
    return parseOneWayFlight(url)
  }

  return
}

const parseOneWayFlight = (url: string): undefined | FlightData => {
  const origin = getUrlParameterValue(url, 'flights[0][origin]=')
  const destination = getUrlParameterValue(url, 'flights[0][destination]=')
  const departure = getUrlParameterValue(url, 'flights[0][departureDate]=')
  const step = getUrlParameterValue(url, 'step').toLowerCase() === 'choosefromfour'
  const emailToContinueWatching = getUrlParameterValue(url, urlParamsConst.continue)

  if (!origin || !destination || !departure || !step) {
    return
  }

  // ignore format 2019-07-14T09:00:00
  if (departure.includes('T')) {
    return
  }

  return {
    departure: new ValidDate(departure),
    destination: new ValidIATALocationList(destination),
    emailToContinueWatching: emailToContinueWatching ? new ValidEmail(emailToContinueWatching) : undefined,
    origin: new ValidIATALocationList(origin),
    flightType: 'oneway'
  }
}

const parseReturnFlight = (url: string): undefined | FlightData => {
  const origin = getUrlParameterValue(url, 'flights[0][origin]=').toUpperCase()
  const destination = getUrlParameterValue(url, 'flights[0][destination]=').toUpperCase()
  const departure = getUrlParameterValue(url, 'flights[0][departureDate]=')
  const arrival = getUrlParameterValue(url, 'flights[1][departureDate]=')
  const step = getUrlParameterValue(url, 'step').toLowerCase() === 'choosefromfour'
  const emailToContinueWatching = getUrlParameterValue(url, 'flightWatchdogContinue')

  if (!origin || !destination || !departure || !arrival || !step) {
    return
  }

  // ignore format 2019-07-14T09:00:00
  if (arrival.includes('T') || departure.includes('T')) {
    return
  }

  return {
    arrival: new ValidDate(arrival),
    departure: new ValidDate(departure),
    destination: new ValidIATALocationList(destination),
    emailToContinueWatching: emailToContinueWatching ? new ValidEmail(emailToContinueWatching) : undefined,
    origin: new ValidIATALocationList(origin),
    flightType: 'return'
  }
}
