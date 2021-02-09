import { AppConfig } from '@client/types/AppConfig'
import { getUrlParameterValue } from '@client/utils/getUrlParameterValue'
import { AppError } from '@shared/errors/AppError'
import { InvalidClientInputError } from '@shared/errors/InvalidClientInputError'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { urlParamsConst } from '@shared/utils/consts'
import {
  ValidDate,
  ValidEmail,
  ValidIATALocationList,
  ValidLanguage,
  ValidNotEmptyString,
  ValidPrice
} from '@travelport-czech/valid-objects-ts'

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
    const langElement = document.getElementsByTagName('html').item(0)
    const lang = new ValidLanguage(
      langElement && langElement.getAttribute('lang'),
      undefined,
      Object.values(SupportedLanguageEnum)
    )

    const lowestPriceElement = doc.querySelector('#airticket-offer-list .airticketOfferItem .tariff-btn strong')
    if (!lowestPriceElement) {
      throw new AppError('Lowest price not found')
    }

    const lowestPrice = new ValidPrice(normalizeText(lowestPriceElement.innerHTML).replace('Kč', 'CZK'))

    const destinationElement = doc.querySelector('#top-infopanel div div div div strong')
    if (!destinationElement) {
      throw new AppError('Destination string not found')
    }

    const destination = new ValidNotEmptyString(destinationElement.innerHTML)
    const destinationList = destination.toString().match(/\(([A-Z]{3})\)/g)

    if (destinationList === null) {
      throw new AppError('Destination IATA code not found')
    }

    // tslint:disable:no-unsafe-any
    return {
      arrival: dataLayer[0].searchVariables.roundTrip
        ? new ValidDate(dataLayer[0].searchVariables.returnDate)
        : undefined,
      departure: new ValidDate(dataLayer[0].searchVariables.departureDate),
      destination: new ValidIATALocationList(dataLayer[0].searchVariables.to),
      emailToContinueWatching: emailToContinueWatching ? new ValidEmail(emailToContinueWatching) : undefined,
      origin: new ValidIATALocationList(destinationList.join('/').replace(/(\(|\))/g, '')),
      flightType: dataLayer[0].searchVariables.roundTrip ? 'return' : 'oneway',
      lowestPrice,
      lowestPriceCustomCurrency: lowestPrice,
      lang
    }
    // tslint:enable
  } catch (e) {
    if (e instanceof Error) {
      throw new InvalidClientInputError(e.message)
    }
    throw e
  }
}

const normalizeText = (s: string) => s.replace(/&nbsp;/g, ' ')
