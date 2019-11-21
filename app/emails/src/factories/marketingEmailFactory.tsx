import { createWatcherLinks } from '@emails/factories/createWatcherLinks'
import {
  createAttachmentFromReact,
  createAttachmentRawFromWatcherList,
  createEmailRawBegin
} from '@emails/factories/emailFactory'
import { emailTemplate, rawEmailEndPart } from '@emails/factories/emailTemplates'
import { EmailMarketingContent } from '@emails/reactComponents/EmailMarketingContent'
import { EmailMarketingSection1 } from '@emails/reactComponents/EmailMarketingSection1'
import { EmailMarketingSection2 } from '@emails/reactComponents/EmailMarketingSection2'
import { AgencyParams } from '@emails/types/AgencyParams'
import { CreateImageCallback } from '@emails/types/CreateImageCallback'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { primaryBackgroundColor } from '@shared/reactComponents/styles'
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
  const watcherLinks = createWatcherLinks(watcherFullInfoList[0].watcher, agencyParams)
  const subject = renderToStaticMarkup(<Text name={TranslationEnum.EmailMarketingHeader} lang={lang} />)
  const content = await createMarketingEmail(watcherFullInfoList, agencyParams, false)
  const rawEmail = createEmailRawBegin(subject, content, email, agencyParams.emailFrom, lang)

  const section1 = await createAttachmentFromReact(
    createImage,
    'watchdogsection1',
    <EmailMarketingSection1 lang={lang} showHtml />,
    200,
    'white'
  )
  const section2 = await createAttachmentFromReact(
    createImage,
    'watchdogsection2',
    <EmailMarketingSection2 lang={lang} showHtml frontendUrl={watcherLinks.frontendUrl} />,
    90,
    primaryBackgroundColor
  )

  const attachments = (await createAttachmentRawFromWatcherList(createImage, watcherFullInfoList)) + section1 + section2

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
