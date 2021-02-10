import { createAttachmentRawFromWatcher, createEmailRawBegin } from '@emails/factories/emailFactory'
import { emailTemplate, rawEmailEndPart } from '@emails/factories/emailTemplates'
import { EmailLowerPriceContent } from '@emails/reactComponents/EmailLowerPriceContent'
import { EmailLowerPriceSubject } from '@emails/reactComponents/EmailLowerPriceSubject'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { ValidPrice } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

export const createLowerPriceEmailRaw = async (
  createImage: (html: string, width: number, height: number) => Promise<string>,
  watcherFullInfo: WatcherFullInfo,
  lang: SupportedLanguageEnum,
  agencyParams: AgencyParams,
  price: ValidPrice
): Promise<string> => {
  const { origin, destination } = watcherFullInfo.watcher
  const subject = renderToStaticMarkup(<EmailLowerPriceSubject origin={origin} destination={destination} lang={lang} />)
  const content = await createLowerPriceEmail(watcherFullInfo, lang, agencyParams, price, false)
  const rawEmail = createEmailRawBegin(
    subject,
    content,
    watcherFullInfo.watcher.email,
    agencyParams.emailFrom,
    agencyParams.emailReplyTo,
    lang
  )

  const attachments = await createAttachmentRawFromWatcher(createImage, watcherFullInfo, lang)

  return rawEmail + attachments + rawEmailEndPart
}

export const createLowerPriceEmail = async (
  watcherFullInfo: WatcherFullInfo,
  lang: SupportedLanguageEnum,
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
      lang={lang}
    />
  )

  return emailTemplate.replace(/\{content\}/g, renderToStaticMarkup(content))
}
