import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createAttachmentPngRaw, createEmailRawBegin } from 'src/server/factories/email/emailFactory'
import { emailTemplate, rawEmailEndPart } from 'src/server/factories/email/emailTemplates'
import { EmailLowerPriceContent } from 'src/server/reactComponents/EmailLowerPriceContent'
import { EmailLowerPriceSubject } from 'src/server/reactComponents/EmailLowerPriceSubject'
import { WatchersGraphPriceHistory } from 'src/server/reactComponents/WatchersGraphPriceHistory'
import { WatcherFullInfo } from 'src/server/types/WatcherFullInfo'
import { ValidEmail } from 'src/shared/validObjects/ValidEmail'
import { ValidPrice } from 'src/shared/validObjects/ValidPrice'

export const createLowerPriceEmailRaw = async (
  createImage: (reactElement: React.ReactElement<{}>, width: number, height: number) => Promise<string>,
  watcherFullInfo: WatcherFullInfo,
  price: ValidPrice,
  emailFrom: ValidEmail
): Promise<string> => {
  const { origin, destination } = watcherFullInfo.watcher
  const subject = renderToStaticMarkup(<EmailLowerPriceSubject origin={origin} destination={destination} />)
  const content = await createLowerPriceEmail(watcherFullInfo, price, false)
  const rawEmail = createEmailRawBegin(subject, content, watcherFullInfo.watcher.email, emailFrom)

  const image = await createImage(
    <WatchersGraphPriceHistory
      searchResults={watcherFullInfo.searchResults}
      priceLimit={watcherFullInfo.watcher.priceLimit}
      watcher={watcherFullInfo.watcher}
      absolutePosition
    />,
    600,
    200
  )

  const attachments = createAttachmentPngRaw(watcherFullInfo.watcher.id.toString(), image)

  return rawEmail + attachments + rawEmailEndPart
}

export const createLowerPriceEmail = async (
  watcherFullInfo: WatcherFullInfo,
  price: ValidPrice,
  showSvg: boolean
): Promise<string> => {
  const content = <EmailLowerPriceContent watcherFullInfo={watcherFullInfo} price={price} showSvg={showSvg} />

  return emailTemplate.replace(/\{content\}/g, renderToStaticMarkup(content))
}
