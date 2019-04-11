import {
  ValidDate,
  ValidEmail,
  ValidIATALocationList,
  ValidLanguage,
  ValidPrice,
  ValidString
} from '@ceesystems/valid-objects-ts'
import { AppConfig } from '@client/types/AppConfig'
import { getUrlParameterValue } from '@client/utils/getUrlParameterValue'
import { AppError } from '@shared/errors/AppError'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

// tslint:disable-next-line:no-any
declare var dataLayer: any // global variable from html

export const createAppConfigFromFe = (doc: Document, url: string): AppConfig | undefined => {
  if (!dataLayer || dataLayer.length === 0) {
    throw new AppError('Empty dataLayer')
  }

  if (!dataLayer[0].searchVariables) {
    throw new AppError('DataLayer not contain searchVariables')
  }

  const emailToContinueWatching = getUrlParameterValue(url, 'flightWatchdogContinue')
  const watcherIdToDelete = getUrlParameterValue(url, 'flightWatchdogDelete')
  const email = getUrlParameterValue(url, 'email')
  const langElement = document.getElementsByTagName('html').item(0)
  const lang = new ValidLanguage(langElement && langElement.getAttribute('lang'), Object.values(SupportedLanguageEnum))

  const lowestPriceElement = <HTMLElement | null>(
    doc.querySelector('.offersData .offerContainer .buttons .tariff-btn strong')
  )

  if (!lowestPriceElement) {
    throw new AppError('DataLayer not contain lowest price')
  }

  return {
    arrival: dataLayer[0].searchVariables.roundTrip ? new ValidDate(dataLayer[0].searchVariables.returnDate) : undefined,
    departure: new ValidDate(dataLayer[0].searchVariables.departureDate),
    destination: new ValidIATALocationList(dataLayer[0].searchVariables.to),
    emailForWatcherDelete: email ? new ValidEmail(email) : undefined,
    emailToContinueWatching: emailToContinueWatching ? new ValidEmail(emailToContinueWatching) : undefined,
    origin: new ValidIATALocationList(dataLayer[0].searchVariables.from),
    flightType: dataLayer[0].searchVariables.roundTrip ? 'return' : 'oneway',
    watcherIdToDelete: watcherIdToDelete ? new ValidString(watcherIdToDelete) : undefined,
    lowestPrice: new ValidPrice(normalizeText(lowestPriceElement.innerText)),
    lang
  }
}

const normalizeText = (s: string) => s.replace(/\s/g, ' ')
