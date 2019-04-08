import { createAttachmentRawFromWatcherList, createEmailRawBegin } from '@emails/factories/emailFactory'
import { emailTemplate, rawEmailEndPart } from '@emails/factories/emailTemplates'
import { EmailMarketingContent } from '@emails/reactComponents/EmailMarketingContent'
import { EmailMarketingSubject } from '@emails/reactComponents/EmailMarketingSubject'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export const createMarketingEmailRaw = async (
  createImage: (html: string, width: number, height: number) => Promise<string>,
  watcherFullInfoList: WatcherFullInfo[],
  agencyParams: AgencyParams
): Promise<string> => {
  const email = watcherFullInfoList[0].watcher.email
  const subject = renderToStaticMarkup(<EmailMarketingSubject />)
  const content = await createMarketingEmail(watcherFullInfoList, agencyParams, false)
  const rawEmail = createEmailRawBegin(subject, content, email, agencyParams.emailFrom)

  const attachments = await createAttachmentRawFromWatcherList(createImage, watcherFullInfoList)

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
