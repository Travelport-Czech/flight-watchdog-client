import * as React from 'react'
import { createLowerPriceEmailRaw } from 'src/server/factories/email/lowerPriceEmailFactory'
import { WatcherFullInfo } from 'src/server/types/WatcherFullInfo'
import { initializeTranslator } from 'src/shared/translation/Text'
import { ValidEmail } from 'src/shared/validObjects/ValidEmail'
import { ValidPrice } from 'src/shared/validObjects/ValidPrice'

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
