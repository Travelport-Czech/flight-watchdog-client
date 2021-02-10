import { AgencyParams } from '@emails/types/AgencyParams'
import { FlightParams } from '@emails/types/FlightParams'
import { WatcherLinks } from '@emails/types/WatcherLinks'
import { WatcherParams } from '@emails/types/WatcherParams'
import { AppLogicError } from '@shared/errors/AppLogicError'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { urlParamsConst } from '@shared/utils/consts'

const langCodeMapToGolLangCode = {
  [SupportedLanguageEnum.cs]: 'cz',
  [SupportedLanguageEnum.en]: 'en',
  [SupportedLanguageEnum.al]: 'al',
  [SupportedLanguageEnum.sk]: 'sk',
  [SupportedLanguageEnum.vi]: 'vi',
}

export const createResultUrl = (
  flight: FlightParams,
  lang: string,
  agencyParams: AgencyParams,
  addParams: { readonly [key: string]: string }
): string => {
  const validatedLang = SupportedLanguageEnum[lang]
  if (!validatedLang) {
    throw new AppLogicError(`Not supported language ${lang}`)
  }

  const { dealerId, frontendUrl } = agencyParams
  const dealerIdUrlPart = dealerId ? '&dealer_id=' + dealerId.toString() : ''
  const waitPageString = `${frontendUrl.toString()}/index.php?action=vWait&redirect=`

  const addParamsPart = Object.entries(addParams).map((item) => {
    return `&${item[0]}=${item[1]}`
  })

  return (
    waitPageString +
    encodeURIComponent(
      frontendUrl.toString() + createResultLink(flight, validatedLang) + dealerIdUrlPart + addParamsPart.join('')
    )
  )
}

const createResultLink = (flight: FlightParams, lang: SupportedLanguageEnum): string => {
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

export const createWatcherLinks = (
  watcher: WatcherParams,
  agencyParams: AgencyParams,
  lang: SupportedLanguageEnum
): WatcherLinks => {
  const { dealerId, frontendUrl } = agencyParams
  const waitPageString = `${frontendUrl}/index.php?lang=${langCodeMapToGolLangCode[lang]}&action=vWait&redirect=`
  const dealerIdUrlPart = dealerId ? '&dealer_id=' + dealerId.toString() : ''
  const resultLinkString = frontendUrl + createResultLink(watcher, lang) + dealerIdUrlPart

  const resultLink = waitPageString + encodeURIComponent(resultLinkString) + `&${urlParamsConst.result}=`

  const continueLink =
    waitPageString +
    encodeURIComponent(resultLinkString + `&${urlParamsConst.continue}=` + encodeURIComponent(watcher.email.toString()))

  return {
    continueLink,
    frontendUrl,
    resultLink,
  }
}
