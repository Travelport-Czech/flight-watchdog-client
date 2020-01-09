import { createLowerPriceEmail } from '@emails/factories/lowerPriceEmailFactory'
import { createMarketingEmail } from '@emails/factories/marketingEmailFactory'
import { createWatchersListEmail } from '@emails/factories/watcherListEmailFactory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { FlightResult } from '@emails/types/FlightResult'
import { SearchResult } from '@emails/types/SearchResult'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { WatcherParams } from '@emails/types/WatcherParams'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import {
  ValidDate,
  ValidDateTime,
  ValidEmail,
  ValidIATALocation,
  ValidIATALocationList,
  ValidLanguage,
  ValidPrice,
  ValidString,
  ValidUrl
} from '@travelport-czech/valid-objects-ts'

// tslint:disable-next-line:export-name
export const showEmail = async (emailName: string) => {
  const langElement = document.getElementsByTagName('html').item(0)
  const lang = new ValidLanguage(langElement && langElement.getAttribute('lang'), Object.values(SupportedLanguageEnum))

  let content = ''
  if (emailName === 'lower-price') {
    content = await createLowerPriceEmailContent(lang)
  }

  if (emailName === 'marketing') {
    content = await createMarketingEmailContent(lang)
  }

  if (emailName === 'watcher-list') {
    content = await createWatcherListEmailContent(lang)
  }

  document.open()
  // tslint:disable-next-line:no-document-write
  document.write(content)
  document.close()
}

const agencySettings: AgencyParams = {
  emailFrom: new ValidEmail('agency@example.cz'),
  emailReplyTo: new ValidEmail('agencyReplyTo@example.cz'),
  dealerId: undefined,
  frontendUrl: new ValidUrl('https://example.cz')
}

const createWatcherFullInfo = (lang: ValidLanguage): WatcherFullInfo => {
  const watcher: WatcherParams = {
    arrival: new ValidDate('2018-12-25'),
    created: new ValidDateTime('2018-09-19 12:00:00'),
    departure: new ValidDate('2018-12-16'),
    destination: new ValidIATALocationList('LON'),
    email: new ValidEmail('none@email.cz'),
    id: new ValidString('example'),
    lang,
    origin: new ValidIATALocationList('PRG'),
    priceLimit: new ValidPrice('6000 CZK'),
    flightType: 'return'
  }

  const searchResult: SearchResult = {
    price: new ValidPrice('4500 CZK'),
    created: new ValidDateTime('2018-09-20 12:00:00'),
    origin: new ValidIATALocationList('PRG'),
    destination: new ValidIATALocationList('LON'),
    departure: new ValidDate('2018-12-16'),
    arrival: new ValidDate('2018-12-25'),
    flightType: 'return'
  }

  const flightResult: FlightResult = {
    price: new ValidPrice('3500 CZK'),
    origin: new ValidIATALocationList('PRG'),
    destination: new ValidIATALocationList('LON'),
    departure: new ValidDate('2018-12-16'),
    arrival: new ValidDate('2018-12-25'),
    flightType: 'return'
  }

  return {
    destinationLocationList: [
      {
        code: new ValidIATALocation('PRG'),
        name: 'Praha'
      }
    ],
    originLocationList: [
      {
        code: new ValidIATALocation('LON'),
        name: 'Londýn'
      }
    ],
    watcher,
    additionalResults: [flightResult, flightResult, flightResult],
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
}

const createLinkToPageWatcherDelete = (watcherId: ValidString): Promise<ValidUrl> => {
  return Promise.resolve(new ValidUrl('https://www.testWatcherDeleted.url'))
}

const createLowerPriceEmailContent = async (lang: ValidLanguage): Promise<string> => {
  const price = new ValidPrice('5000 CZK')

  const watcherFullInfo = createWatcherFullInfo(lang)

  return createLowerPriceEmail(watcherFullInfo, agencySettings, price, true)
}

const createMarketingEmailContent = async (lang: ValidLanguage): Promise<string> => {
  const watcherFullInfo = createWatcherFullInfo(lang)

  return createMarketingEmail(createLinkToPageWatcherDelete, [watcherFullInfo, watcherFullInfo], agencySettings, true)
}

const createWatcherListEmailContent = async (lang: ValidLanguage): Promise<string> => {
  const watcherFullInfo = createWatcherFullInfo(lang)

  return createWatchersListEmail(createLinkToPageWatcherDelete, [watcherFullInfo, watcherFullInfo], agencySettings, true)
}

// set as global function
// tslint:disable-next-line:no-any
const global = window as any
// tslint:disable-next-line:no-object-mutation no-unsafe-any
global.showEmail = showEmail
