import { AppConfig } from '@client/types/AppConfig'
import { parseGolUrl } from '@client/utils/parseGolUrl'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { ValidEmail, ValidLanguage, ValidPrice } from '@travelport-czech/valid-objects-ts'

export const createAppConfigFromFe = (doc: Document, url: string): AppConfig | undefined => {
    const appConfigPartFromUrl = parseGolUrl(url)

    if (!appConfigPartFromUrl) {
        console.log('Flight watchdog error', 'Can not parse url.')

        return
    }

    const lowestPrice = doc
        .getElementsByClassName('flight-prices-links-price')
        .item(0)
        ?.textContent?.trim()
        .replace('Kč', 'CZK')
        .replace(',00', '') // for SR language is different format of price e.g. 7.125,00
        .replace('.', ' ')

    if (!lowestPrice) {
        console.log('Flight watchdog error', 'Price not found.')

        return
    }

    const langFromFe = document
        .getElementsByClassName('header-menu-languages-selected')[0]
        ?.textContent?.toLocaleLowerCase()
    const lang = new ValidLanguage(langFromFe, undefined, Object.values(SupportedLanguageEnum)).getString()

    return {
        ...appConfigPartFromUrl,
        customerEmail: getCustomerEmail(doc),
        lowestPrice: new ValidPrice(lowestPrice),
        lowestPriceCustomCurrency: new ValidPrice(lowestPrice),
        lang: SupportedLanguageEnum[lang],
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
