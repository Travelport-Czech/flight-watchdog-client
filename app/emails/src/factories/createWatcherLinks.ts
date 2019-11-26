import { AgencyParams } from '@emails/types/AgencyParams'
import { FlightParams } from '@emails/types/FlightParams'
import { WatcherLinks } from '@emails/types/WatcherLinks'
import { WatcherParams } from '@emails/types/WatcherParams'
import { AppLogicError } from '@shared/errors/AppLogicError'
import { urlParamsConst } from '@shared/utils/consts'
import { ValidLanguage, ValidUrl } from '@travelport-czech/valid-objects-ts'

const langCodeMapToGolLangCode = {
  cs: 'cs',
  en: 'en'
}

export const createResultUrl = (
  flight: FlightParams,
  lang: ValidLanguage,
  agencyParams: AgencyParams,
  addParams: { readonly [key: string]: string }
): ValidUrl => {
  const { dealerId, frontendUrl } = agencyParams
  const dealerIdUrlPart = dealerId ? '&dealer_id=' + dealerId.toString() : ''

  const addParamsPart = Object.entries(addParams).map(item => {
    return `&${item[0]}=${item[1]}`
  })

  return new ValidUrl(
    frontendUrl.toString() + createResultLink(flight, lang) + dealerIdUrlPart + addParamsPart.join('')
  )
}

const createResultLink = (flight: FlightParams, lang: ValidLanguage): string => {
  if (flight.flightType === 'return') {
    if (!flight.arrival) {
      throw new AppLogicError('Missing arrival for return flight')
    }

    return `/booking/api/search/v3?\
id_dealer=10\
&client_encoding=utf-8\
&lang=${langCodeMapToGolLangCode[lang.toString()]}\
&id=airticket\
&ui_formtype=round_trip\
&arrival_destination_1_short=${encodeURIComponent(flight.destination.codes.join(','))}\
&arrival_destination_1=${encodeURIComponent(flight.destination.codes.join(','))}\
&departure_destination_1_short=${encodeURIComponent(flight.origin.codes.join(','))}\
&departure_destination_1=${encodeURIComponent(flight.origin.codes.join(','))}\
&departure_date_1=${flight.departure.formatToSystem()}\
&departure_date_2=${flight.arrival.formatToSystem()}\
&passengers_adt=1\
`
  }

  if (flight.flightType === 'oneway') {
    return `/booking/api/search/v3?\
id_dealer=10\
&client_encoding=utf-8\
&lang=${langCodeMapToGolLangCode[lang.toString()]}\
&id=airticket\
&ui_formtype=oneway\
&arrival_destination_1_short=${encodeURIComponent(flight.destination.codes.join(','))}\
&arrival_destination_1=${encodeURIComponent(flight.destination.codes.join(','))}\
&departure_destination_1_short=${encodeURIComponent(flight.origin.codes.join(','))}\
&departure_destination_1=${encodeURIComponent(flight.origin.codes.join(','))}\
&departure_date_1=${flight.departure.formatToSystem()}\
&passengers_adt=1\
`
  }

  throw new AppLogicError('Bad flight type')
}

export const createWatcherLinks = (watcher: WatcherParams, agencyParams: AgencyParams): WatcherLinks => {
  const { dealerId, frontendUrl } = agencyParams
  const dealerIdUrlPart = dealerId ? '&dealer_id=' + dealerId.toString() : ''
  const resultLinkString = frontendUrl.toString() + createResultLink(watcher, watcher.lang) + dealerIdUrlPart

  const resultLink = new ValidUrl(`${resultLinkString}&${urlParamsConst.result}=`)

  const continueLink = new ValidUrl(`${resultLinkString}\
&${urlParamsConst.continue}=${encodeURIComponent(watcher.email.toString())}`)

  const deleteLink = new ValidUrl(`${resultLinkString}\
&${urlParamsConst.delete}=${encodeURIComponent(watcher.id.toString())}\
&${urlParamsConst.email}=${encodeURIComponent(watcher.email.toString())}`)

  return {
    continueLink,
    deleteLink,
    frontendUrl,
    resultLink
  }
}
