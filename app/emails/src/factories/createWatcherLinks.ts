import { AgencyParams } from '@emails/types/AgencyParams'
import { FlightParams } from '@emails/types/FlightParams'
import { WatcherLinks } from '@emails/types/WatcherLinks'
import { WatcherParams } from '@emails/types/WatcherParams'
import { AppLogicError } from '@shared/errors/AppLogicError'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { urlParamsConst } from '@shared/utils/consts'
import { ValidLanguage, ValidUrl } from '@travelport-czech/valid-objects-ts'

const langCodeMapToGolLangCode = {
  [SupportedLanguageEnum.cs]: 'cz',
  [SupportedLanguageEnum.en]: 'en',
  [SupportedLanguageEnum.al]: 'al',
  [SupportedLanguageEnum.sk]: 'sk'
}

export const createResultUrl = (
  flight: FlightParams,
  lang: ValidLanguage,
  agencyParams: AgencyParams,
  addParams: { readonly [key: string]: string }
): ValidUrl => {
  const { dealerId, frontendUrl } = agencyParams
  const dealerIdUrlPart = dealerId ? '&dealer_id=' + dealerId.toString() : ''
  const waitPageString = `${frontendUrl.toString()}/index.php?action=vWait&redirect=`

  const addParamsPart = Object.entries(addParams).map(item => {
    return `&${item[0]}=${item[1]}`
  })

  return new ValidUrl(
    waitPageString +
      encodeURIComponent(
        frontendUrl.toString() + createResultLink(flight, lang) + dealerIdUrlPart + addParamsPart.join('')
      )
  )
}

const createResultLink = (flight: FlightParams, lang: ValidLanguage): string => {
  if (flight.flightType === 'return') {
    if (!flight.arrival) {
      throw new AppLogicError('Missing arrival for return flight')
    }

    return `/index.php?action=vFlights\
&flights[0][departureDate]=${flight.departure.formatToSystem()}\
&flights[0][destination]=${flight.destination.toString()}\
&flights[0][origin]=${encodeURIComponent(flight.origin.toString())}\
&flights[1][departureDate]=${flight.arrival.formatToSystem()}\
&flights[1][destination]=${flight.origin.toString()}\
&flights[1][origin]=${flight.destination.toString()}\
&lang=${langCodeMapToGolLangCode[lang.toString()]}\
&travelers[0]=ADT\
&returnTicket=on\
&dateVariants=exact\
&step=ChooseFromFour`
  }

  if (flight.flightType === 'oneway') {
    return `/index.php?action=vFlights\
&flights[0][departureDate]=${flight.departure.formatToSystem()}\
&flights[0][destination]=${flight.destination.toString()}\
&flights[0][origin]=${encodeURIComponent(flight.origin.toString())}\
&lang=${langCodeMapToGolLangCode[lang.toString()]}\
&travelers[0]=ADT\
&returnTicket=\
&dateVariants=exact\
&step=ChooseFromFour`
  }

  throw new AppLogicError('Bad flight type')
}

export const createWatcherLinks = (watcher: WatcherParams, agencyParams: AgencyParams): WatcherLinks => {
  const { dealerId, frontendUrl } = agencyParams
  const waitPageString = `${frontendUrl.toString()}/index.php?lang=${
    langCodeMapToGolLangCode[watcher.lang.toString()]
  }&action=vWait&redirect=`
  const dealerIdUrlPart = dealerId ? '&dealer_id=' + dealerId.toString() : ''
  const resultLinkString = frontendUrl.toString() + createResultLink(watcher, watcher.lang) + dealerIdUrlPart

  const resultLink = new ValidUrl(waitPageString + encodeURIComponent(resultLinkString) + `&${urlParamsConst.result}=`)

  const continueLink = new ValidUrl(
    waitPageString +
      encodeURIComponent(
        resultLinkString + `&${urlParamsConst.continue}=` + encodeURIComponent(watcher.email.toString())
      )
  )

  return {
    continueLink,
    frontendUrl,
    resultLink
  }
}
