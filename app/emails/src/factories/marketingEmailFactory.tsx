import {
  createAttachmentFromReact,
  createAttachmentRawFromWatcherList,
  createEmailRawBegin
} from '@emails/factories/emailFactory'
import { emailTemplate, rawEmailEndPart } from '@emails/factories/emailTemplates'
import { ArrowImage } from '@emails/reactComponents/ArrowImage'
import { EmailMarketingContent } from '@emails/reactComponents/EmailMarketingContent'
import { EmailMarketingSection1 } from '@emails/reactComponents/EmailMarketingSection1'
import { AgencyParams } from '@emails/types/AgencyParams'
import { CreateImageCallback } from '@emails/types/CreateImageCallback'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { secondaryBackgroundColor } from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export const createMarketingEmailRaw = async (
  createImage: CreateImageCallback,
  watcherFullInfoList: WatcherFullInfo[],
  agencyParams: AgencyParams
): Promise<string> => {
  const { email, lang } = watcherFullInfoList[0].watcher
  const subject = renderToStaticMarkup(<Text name={TranslationEnum.EmailMarketingHeader} lang={lang} />)
  const content = await createMarketingEmail(watcherFullInfoList, agencyParams, false)
  const rawEmail = createEmailRawBegin(subject, content, email, agencyParams.emailFrom, lang)

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

  const attachments = (await createAttachmentRawFromWatcherList(createImage, watcherFullInfoList)) + section1 + arrow

  return rawEmail + attachments + rawEmailEndPart
}

export const createMarketingEmail = async (
  watcherFullInfoList: WatcherFullInfo[],
  agencyParams: AgencyParams,
  showSvg: boolean
): Promise<string> => {
  const content = (
    <EmailMarketingContent watchersFullInfoList={watcherFullInfoList} showSvg={showSvg} agencyParams={agencyParams} />
  )

  return emailTemplate.replace(/\{content\}/g, renderToStaticMarkup(content))
}
