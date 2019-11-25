import {
  createAttachmentFromReact,
  createAttachmentRawFromWatcherPriceHistory,
  createEmailRawBegin
} from '@emails/factories/emailFactory'
import { emailTemplate, rawEmailEndPart } from '@emails/factories/emailTemplates'
import { ArrowImage } from '@emails/reactComponents/ArrowImage'
import { EmailLowerPriceContent } from '@emails/reactComponents/EmailLowerPriceContent'
import { EmailLowerPriceSubject } from '@emails/reactComponents/EmailLowerPriceSubject'
import { EmailMarketingSection1 } from '@emails/reactComponents/EmailMarketingSection1'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { secondaryBackgroundColor } from '@shared/reactComponents/styles'
import { ValidPrice } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export const createLowerPriceEmailRaw = async (
  createImage: (html: string, width: number, height: number) => Promise<string>,
  watcherFullInfo: WatcherFullInfo,
  agencyParams: AgencyParams,
  price: ValidPrice
): Promise<string> => {
  const { origin, destination, lang } = watcherFullInfo.watcher
  const subject = renderToStaticMarkup(<EmailLowerPriceSubject origin={origin} destination={destination} lang={lang} />)
  const content = await createLowerPriceEmail(watcherFullInfo, agencyParams, price, false)
  const rawEmail = createEmailRawBegin(subject, content, watcherFullInfo.watcher.email, agencyParams.emailFrom, lang)

  const section1 = await createAttachmentFromReact(
    createImage,
    'watchdogsection1',
    <EmailMarketingSection1 lang={lang} showHtml />,
    600,
    200,
    'white'
  )

  const arrow = await createAttachmentFromReact(
    createImage,
    'arrow',
    <ArrowImage showHtml />,
    18,
    30,
    secondaryBackgroundColor
  )

  const attachments =
    (await createAttachmentRawFromWatcherPriceHistory(createImage, watcherFullInfo)) + section1 + arrow

  return rawEmail + attachments + rawEmailEndPart
}

export const createLowerPriceEmail = async (
  watcherFullInfo: WatcherFullInfo,
  agencyParams: AgencyParams,
  price: ValidPrice,
  showSvg: boolean
): Promise<string> => {
  const content = (
    <EmailLowerPriceContent
      watcherFullInfo={watcherFullInfo}
      price={price}
      showSvg={showSvg}
      agencyParams={agencyParams}
    />
  )

  return emailTemplate.replace(/\{content\}/g, renderToStaticMarkup(content))
}
