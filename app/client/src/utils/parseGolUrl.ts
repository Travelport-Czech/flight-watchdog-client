import { getUrlParameterValue } from '@client/utils/getUrlParameterValue'
import { urlParamsConst } from '@shared/utils/consts'
import {
    createIataLocationListFromUnknown,
    ValidDate,
    ValidEmail,
    ValidIATALocationList,
} from '@travelport-czech/valid-objects-ts'

interface FlightData {
    readonly flightType: 'return' | 'oneway'
    readonly origin: ValidIATALocationList
    readonly destination: ValidIATALocationList
    readonly departure: ValidDate
    readonly arrival?: ValidDate
    readonly emailToContinueWatching?: ValidEmail
}

export const parseGolUrl = (url: string): undefined | FlightData => {
    const departureDate = getUrlParameterValue(url, 'departureDate')
    const returnDate = getUrlParameterValue(url, 'returnDate')
    if (departureDate !== '' && returnDate !== '') {
        return parseReturnFlight(url)
    }

    if (departureDate !== '' && returnDate === '') {
        return parseOneWayFlight(url)
    }

    return
}

const parseOneWayFlight = (url: string): undefined | FlightData => {
    const origin = getUrlParameterValue(url, 'from')
    const destination = getUrlParameterValue(url, 'to')
    const departure = getUrlParameterValue(url, 'departureDate')
    const emailToContinueWatching = getUrlParameterValue(url, urlParamsConst.continue)

    if (!origin || !destination || !departure) {
        return
    }

    // ignore format 2019-07-14T09:00:00
    if (departure.includes('T')) {
        return
    }

    const destinationResult = createIataLocationListFromUnknown(destination, { allowPlus: true })
    if (!destinationResult.success) {
        throw new Error(destinationResult.error)
    }

    const originResult = createIataLocationListFromUnknown(origin, { allowPlus: true })
    if (!originResult.success) {
        throw new Error(originResult.error)
    }

    return {
        departure: new ValidDate(departure),
        destination: destinationResult.data,
        emailToContinueWatching: emailToContinueWatching ? new ValidEmail(emailToContinueWatching) : undefined,
        origin: originResult.data,
        flightType: 'oneway',
    }
}

const parseReturnFlight = (url: string): undefined | FlightData => {
    const origin = getUrlParameterValue(url, 'from')
    const destination = getUrlParameterValue(url, 'to')
    const departure = getUrlParameterValue(url, 'departureDate')
    const arrival = getUrlParameterValue(url, 'returnDate')
    const emailToContinueWatching = getUrlParameterValue(url, 'flightWatchdogContinue')

    if (!origin || !destination || !departure || !arrival) {
        return
    }

    // ignore format 2019-07-14T09:00:00
    if (arrival.includes('T') || departure.includes('T')) {
        return
    }

    const destinationResult = createIataLocationListFromUnknown(destination, { allowPlus: true })
    if (!destinationResult.success) {
        throw new Error(destinationResult.error)
    }

    const originResult = createIataLocationListFromUnknown(origin, { allowPlus: true })
    if (!originResult.success) {
        throw new Error(originResult.error)
    }

    return {
        arrival: new ValidDate(arrival),
        departure: new ValidDate(departure),
        destination: destinationResult.data,
        emailToContinueWatching: emailToContinueWatching ? new ValidEmail(emailToContinueWatching) : undefined,
        origin: originResult.data,
        flightType: 'return',
    }
}
