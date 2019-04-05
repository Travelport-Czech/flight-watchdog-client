import { createLowerPriceEmail } from '@emails/factories/lowerPriceEmailFactory'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { WatcherParams } from '@emails/types/WatcherParams'
import { initializeTranslator } from '@shared/translation/Text'
import { ValidDate } from '@shared/validObjects/ValidDate'
import { ValidDateTime } from '@shared/validObjects/ValidDateTime'
import { ValidEmail } from '@shared/validObjects/ValidEmail'
import { ValidFlightType } from '@shared/validObjects/ValidFlightType'
import { ValidLanguage } from '@shared/validObjects/ValidLanguage'
import { ValidLocationCode } from '@shared/validObjects/ValidLocationCode'
import { ValidLocationCodeList } from '@shared/validObjects/ValidLocationCodeList'
import { ValidPrice } from '@shared/validObjects/ValidPrice'
import { ValidUrl } from '@shared/validObjects/ValidUrl'
import { ValidWatcherId } from '@shared/validObjects/ValidWatcherId'

// tslint:disable-next-line:export-name
export const showEmail = async (emailName: string) => {
  const langElement = document.getElementsByTagName('html').item(0)
  const lang = new ValidLanguage(langElement && langElement.getAttribute('lang'))

  initializeTranslator(lang)

  const content = await createEmailContent(lang)

  document.open()
  // tslint:disable-next-line:no-document-write
  document.write(content)
  document.close()
}

const createEmailContent = async (lang: ValidLanguage): Promise<string> => {
  const price = new ValidPrice('5000 CZK')
  const watcher: WatcherParams = {
    arrival: new ValidDate('2018-12-25'),
    created: new ValidDateTime('2018-09-19 12:00:00'),
    departure: new ValidDate('2018-12-16'),
    destination: new ValidLocationCodeList('LON'),
    email: new ValidEmail('none@email.cz'),
    id: new ValidWatcherId('example'),
    lang,
    origin: new ValidLocationCodeList('PRG'),
    priceLimit: new ValidPrice('6000 CZK'),
    flightType: new ValidFlightType('return')
  }

  const searchResult = {
    price: new ValidPrice('4500 CZK'),
    created: new ValidDateTime('2018-09-20 12:00:00'),
    origin: new ValidLocationCodeList('PRG'),
    destination: new ValidLocationCodeList('LON'),
    departure: new ValidDate('2018-12-16'),
    arrival: new ValidDate('2018-12-25'),
    flightType: new ValidFlightType('return')
  }

  const watcherFullInfo: WatcherFullInfo = {
    destinationLocationList: [
      {
        code: new ValidLocationCode('PRG'),
        name: 'Praha'
      }
    ],
    originLocationList: [
      {
        code: new ValidLocationCode('LON'),
        name: 'Londýn'
      }
    ],
    watcher,
    watcherLinks: {
      continueLink: new ValidUrl('https://example.cz'),
      deleteLink: new ValidUrl('https://example.cz'),
      frontendUrl: new ValidUrl('https://example.cz'),
      resultLink: new ValidUrl('https://example.cz')
    },
    searchResults: [
      searchResult,
      {
        ...searchResult,
        price: new ValidPrice('5812 CZK'),
        created: new ValidDateTime('2018-09-21 12:00:00')
      },
      {
        ...searchResult,
        price: new ValidPrice('6321 CZK'),
        created: new ValidDateTime('2018-09-22 12:00:00')
      },
      {
        ...searchResult,
        price: new ValidPrice('5000 CZK'),
        created: new ValidDateTime('2018-09-23 12:00:00')
      }
    ]
  }

  return createLowerPriceEmail(watcherFullInfo, price, true)
}

// set as global function
// tslint:disable-next-line:no-any
const global = window as any
// tslint:disable-next-line:no-object-mutation no-unsafe-any
global.showEmail = showEmail
