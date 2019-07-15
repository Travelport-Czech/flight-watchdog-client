import {
  ValidDate,
  ValidEmail,
  ValidIATALocationList,
  ValidLanguage,
  ValidObjectError,
  ValidPrice,
  ValidString
} from '@ceesystems/valid-objects-ts'
import { AppConfig } from '@client/types/AppConfig'
import { getUrlParameterValue } from '@client/utils/getUrlParameterValue'
import { AppError } from '@shared/errors/AppError'
import { InvalidClientInputError } from '@shared/errors/InvalidClientInputError'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { urlParamsConst } from '@shared/utils/consts'

// tslint:disable-next-line:no-any
declare var dataLayer: any // global variable from html

export const createAppConfigFromFe = (doc: Document, url: string): AppConfig | undefined => {
  try {
    // tslint:disable-next-line:no-unsafe-any
    if (!dataLayer || dataLayer.length === 0) {
      throw new AppError('Empty dataLayer')
    }

    // tslint:disable-next-line:no-unsafe-any
    if (!dataLayer[0].searchVariables) {
      throw new AppError('DataLayer not contain searchVariables')
    }

    const emailToContinueWatching = getUrlParameterValue(url, urlParamsConst.continue)
    const watcherIdToDelete = getUrlParameterValue(url, urlParamsConst.delete)
    const email = getUrlParameterValue(url, urlParamsConst.email)
    const langElement = document.getElementsByTagName('html').item(0)
    const lang = new ValidLanguage(
      langElement && langElement.getAttribute('lang'),
      Object.values(SupportedLanguageEnum)
    )

    const lowestPriceElement = doc.querySelector('#airticket-offer-list .airticketOfferItem .tariff-btn strong')

    if (!lowestPriceElement) {
      throw new AppError('Lowest price not found')
    }

    const lowestPrice = new ValidPrice(normalizeText(lowestPriceElement.innerHTML))

    // tslint:disable:no-unsafe-any
    return {
      arrival: dataLayer[0].searchVariables.roundTrip
        ? new ValidDate(dataLayer[0].searchVariables.returnDate)
        : undefined,
      departure: new ValidDate(dataLayer[0].searchVariables.departureDate),
      destination: new ValidIATALocationList(dataLayer[0].searchVariables.to),
      emailForWatcherDelete: email ? new ValidEmail(email) : undefined,
      emailToContinueWatching: emailToContinueWatching ? new ValidEmail(emailToContinueWatching) : undefined,
      origin: new ValidIATALocationList(dataLayer[0].searchVariables.from),
      flightType: dataLayer[0].searchVariables.roundTrip ? 'return' : 'oneway',
      watcherIdToDelete: watcherIdToDelete ? new ValidString(watcherIdToDelete) : undefined,
      lowestPrice,
      lowestPriceCustomCurrency: lowestPrice,
      lang
    }
    // tslint:enable
  } catch (e) {
    if (e instanceof AppError || e instanceof ValidObjectError) {
      throw new InvalidClientInputError(e.message)
    }
    throw e
  }
}

const normalizeText = (s: string) => s.replace(/&nbsp;/g, ' ')
