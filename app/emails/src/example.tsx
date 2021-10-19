import { createLowerPriceEmail } from '@emails/factories/lowerPriceEmailFactory'
import { createMarketingEmail } from '@emails/factories/marketingEmailFactory'
import { createWatchersListEmail } from '@emails/factories/watcherListEmailFactory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { FlightResult } from '@emails/types/FlightResult'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { WatcherParams } from '@emails/types/WatcherParams'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import {
  createIataLocationListFromUnknown,
  ValidDate,
  ValidDateTime,
  ValidEmail,
  ValidLanguage,
  ValidPrice,
} from '@travelport-czech/valid-objects-ts'

// tslint:disable-next-line:export-name
export const showEmail = async (emailName: string) => {
  const langElement = document.getElementsByTagName('html').item(0)
  const lang =
    SupportedLanguageEnum[
      new ValidLanguage(
        langElement && langElement.getAttribute('lang'),
        undefined,
        Object.values(SupportedLanguageEnum)
      ).getString()
    ]

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
  frontendUrl: 'https://example.cz',
}

const createWatcherFullInfo = (): WatcherFullInfo => {
  const destinationResult = createIataLocationListFromUnknown('LON', { allowPlus: true })
  if (!destinationResult.success) {
    throw new Error(destinationResult.error)
  }

  const originResult = createIataLocationListFromUnknown('PRG+', { allowPlus: true })
  if (!originResult.success) {
    throw new Error(originResult.error)
  }

  const watcher: WatcherParams = {
    arrival: new ValidDate('2018-12-25'),
    created: new ValidDateTime('2018-09-19 12:00:00'),
    departure: new ValidDate('2018-12-16'),
    destination: destinationResult.data,
    email: new ValidEmail('none@email.cz'),
    id: 'example',
    origin: originResult.data,
    priceLimit: new ValidPrice('6000 CZK'),
    flightType: 'return',
  }

  const flightResult: FlightResult = {
    price: new ValidPrice('3500 CZK'),
    origin: originResult.data,
    destination: destinationResult.data,
    departure: new ValidDate('2018-12-16'),
    arrival: new ValidDate('2018-12-25'),
    flightType: 'return',
  }

  return {
    destinationLocationList: [
      {
        code: destinationResult.data,
        name: 'Londýn',
      },
    ],
    originLocationList: [
      {
        code: originResult.data,
        name: 'Praha',
      },
    ],
    watcher,
    additionalResults: [flightResult, flightResult, flightResult],
    priceHistory: [
      {
        price: new ValidPrice('4500 CZK'),
        created: new ValidDateTime('2018-09-20 12:00:00'),
      },
      {
        price: new ValidPrice('5812 CZK'),
        created: new ValidDateTime('2018-09-21 12:00:00'),
      },
      {
        price: new ValidPrice('6321 CZK'),
        created: new ValidDateTime('2018-09-22 12:00:00'),
      },
      {
        price: new ValidPrice('5000 CZK'),
        created: new ValidDateTime('2018-09-23 12:00:00'),
      },
    ],
  }
}

const createLinkToPageWatcherDelete = async (watcherId: string): Promise<string> => {
  return Promise.resolve('https://www.testWatcherDeleted.url')
}

const createLowerPriceEmailContent = async (lang: SupportedLanguageEnum): Promise<string> => {
  const price = new ValidPrice('5000 CZK')

  const watcherFullInfo = createWatcherFullInfo()

  return createLowerPriceEmail(watcherFullInfo, lang, agencySettings, price, true)
}

const createMarketingEmailContent = async (lang: SupportedLanguageEnum): Promise<string> => {
  const watcherFullInfo = createWatcherFullInfo()

  return createMarketingEmail(
    createLinkToPageWatcherDelete,
    [watcherFullInfo, watcherFullInfo],
    lang,
    agencySettings,
    true
  )
}

const createWatcherListEmailContent = async (lang: SupportedLanguageEnum): Promise<string> => {
  const watcherFullInfo = createWatcherFullInfo()

  return createWatchersListEmail(
    createLinkToPageWatcherDelete,
    [watcherFullInfo, watcherFullInfo],
    lang,
    agencySettings,
    true
  )
}

// set as global function
// tslint:disable-next-line:no-any
const global = window as any
// tslint:disable-next-line:no-object-mutation no-unsafe-any
global.showEmail = showEmail
