import { createLowerPriceEmailRaw } from '@emails/factories/lowerPriceEmailFactory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { initializeTranslator } from '@shared/translation/Text'
import { ValidPrice } from '@shared/validObjects/ValidPrice'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const sendLowerPriceEmail = async (
  sendEmail: (content: string) => Promise<void>,
  createImage: (html: string, width: number, height: number) => Promise<string>,
  watcherFullInfo: WatcherFullInfo,
  agencyParams: AgencyParams,
  price: ValidPrice
) => {
  initializeTranslator(watcherFullInfo.watcher.lang)

  const emailContent = await createLowerPriceEmailRaw(createImage, watcherFullInfo, agencyParams, price)

  await sendEmail(emailContent)
}
