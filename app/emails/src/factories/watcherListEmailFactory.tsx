import { createWatcherLinks } from '@emails/factories/createWatcherLinks'
import {
  createAttachmentFromReact,
  createAttachmentRawFromWatcherList,
  createEmailRawBegin
} from '@emails/factories/emailFactory'
import { emailTemplate, rawEmailEndPart } from '@emails/factories/emailTemplates'
import { EmailWatchersListContent } from '@emails/reactComponents/EmailWatchersListContent'
import { EmailWatchersListSection1 } from '@emails/reactComponents/EmailWatchersListSection1'
import { EmailWatchersListSection2 } from '@emails/reactComponents/EmailWatchersListSection2'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { primaryBackgroundColor } from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export const createWatcherListEmailRaw = async (
  createImage: (html: string, width: number, height: number) => Promise<string>,
  watcherFullInfoList: WatcherFullInfo[],
  agencyParams: AgencyParams
): Promise<string> => {
  const { email, lang } = watcherFullInfoList[0].watcher
  const watcherLinks = createWatcherLinks(watcherFullInfoList[0].watcher, agencyParams)
  const subject = renderToStaticMarkup(<Text name={TranslationEnum.EmailWatcherListHeader} lang={lang} />)
  const content = await createWatchersListEmail(watcherFullInfoList, agencyParams, false)
  const rawEmail = createEmailRawBegin(subject, content, email, agencyParams.emailFrom, lang)

  const section1 = await createAttachmentFromReact(
    createImage,
    'watchdogsection1',
    <EmailWatchersListSection1 lang={lang} showHtml />,
    200,
    'white'
  )
  const section2 = await createAttachmentFromReact(
    createImage,
    'watchdogsection2',
    <EmailWatchersListSection2 lang={lang} showHtml frontendUrl={watcherLinks.frontendUrl} />,
    130,
    primaryBackgroundColor
  )

  const attachments = (await createAttachmentRawFromWatcherList(createImage, watcherFullInfoList)) + section1 + section2

  return rawEmail + attachments + rawEmailEndPart
}

export const createWatchersListEmail = async (
  watcherFullInfoList: WatcherFullInfo[],
  agencyParams: AgencyParams,
  showSvg: boolean
): Promise<string> => {
  const content = (
    <EmailWatchersListContent
      watchersFullInfoList={watcherFullInfoList}
      agencyParams={agencyParams}
      showSvg={showSvg}
    />
  )

  return emailTemplate.replace(/\{content\}/g, renderToStaticMarkup(content))
}
