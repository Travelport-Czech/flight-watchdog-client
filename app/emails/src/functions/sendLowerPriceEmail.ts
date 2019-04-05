import { createLowerPriceEmailRaw } from '@emails/factories/lowerPriceEmailFactory'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { initializeTranslator } from '@shared/translation/Text'
import { ValidEmail } from '@shared/validObjects/ValidEmail'
import { ValidPrice } from '@shared/validObjects/ValidPrice'
import * as React from 'react'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const sendLowerPriceEmail = async (
  sendEmail: (content: string) => Promise<void>,
  createImage: (reactElement: React.ReactElement<{}>, width: number, height: number) => Promise<string>,
  watcherFullInfo: WatcherFullInfo,
  price: ValidPrice,
  emailFrom: ValidEmail
) => {
  initializeTranslator(watcherFullInfo.watcher.lang)

  const emailContent = await createLowerPriceEmailRaw(createImage, watcherFullInfo, price, emailFrom)

  await sendEmail(emailContent)
}
