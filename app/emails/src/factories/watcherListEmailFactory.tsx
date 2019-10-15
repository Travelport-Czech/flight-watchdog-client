import { createAttachmentRawFromWatcherList, createEmailRawBegin } from '@emails/factories/emailFactory'
import { emailTemplate, rawEmailEndPart } from '@emails/factories/emailTemplates'
import { EmailWatchersListContent } from '@emails/reactComponents/EmailWatchersListContent'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
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
  const subject = renderToStaticMarkup(<Text name={TranslationEnum.EmailWatcherListHeader} lang={lang} />)
  const content = await createWatchersListEmail(watcherFullInfoList, agencyParams, false)
  const rawEmail = createEmailRawBegin(subject, content, email, agencyParams.emailFrom, lang)

  const attachments = await createAttachmentRawFromWatcherList(createImage, watcherFullInfoList)

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
