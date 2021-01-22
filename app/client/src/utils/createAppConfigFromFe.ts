import { AppConfig } from '@client/types/AppConfig'
import { parseGolUrl } from '@client/utils/parseGolUrl'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { ValidEmail, ValidLanguage, ValidPrice } from '@travelport-czech/valid-objects-ts'

export const createAppConfigFromFe = (doc: Document, url: string): AppConfig | undefined => {
  const appConfigPartFromUrl = parseGolUrl(url)

  if (!appConfigPartFromUrl) {
    // tslint:disable-next-line
    console.log('Flight watchdog error', 'Bad url.')

    return
  }

  const lowestPriceHtmlElement = <HTMLSpanElement | null>doc.getElementsByClassName('AO3_TotalFareValue').item(0)
  const lowestPrice =
    lowestPriceHtmlElement && lowestPriceHtmlElement.getAttribute('data-default-price')
      ? lowestPriceHtmlElement.getAttribute('data-default-price')
      : ''

  const lowestPriceCustomCurrency =
    lowestPriceHtmlElement && lowestPriceHtmlElement.textContent ? lowestPriceHtmlElement.textContent : ''

  if (!lowestPrice) {
    // tslint:disable-next-line
    console.log('Flight watchdog error', 'Price not found.')

    return
  }

  const langElement = document.getElementsByTagName('html').item(0)
  const lang = new ValidLanguage(
    langElement && langElement.getAttribute('lang'),
    undefined,
    Object.values(SupportedLanguageEnum)
  )

  return {
    ...appConfigPartFromUrl,
    customerEmail: getCustomerEmail(doc),
    lowestPrice: new ValidPrice(lowestPrice),
    lowestPriceCustomCurrency: new ValidPrice(lowestPriceCustomCurrency),
    lang,
  }
}

const getCustomerEmail = (doc: Document): ValidEmail | undefined => {
  try {
    const userEmailHtmlElement = <HTMLInputElement | null>doc.getElementById('fiUsername')

    return userEmailHtmlElement && userEmailHtmlElement.value
      ? new ValidEmail(userEmailHtmlElement.value, undefined, ['+'])
      : undefined
  } catch (err) {
    return
  }
}
