import { createAttachmentRawFromWatcherList, createEmailRawBegin } from '@emails/factories/emailFactory'
import { emailTemplate, rawEmailEndPart } from '@emails/factories/emailTemplates'
import { EmailWatchersListContent } from '@emails/reactComponents/EmailWatchersListContent'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidString, ValidUrl } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export const createWatcherListEmailRaw = async (
  createImage: (html: string, width: number, height: number) => Promise<string>,
  createLinkToPageWatcherDelete: (watcherId: ValidString) => Promise<ValidUrl>,
  watcherFullInfoList: WatcherFullInfo[],
  agencyParams: AgencyParams
): Promise<string> => {
  const { email, lang } = watcherFullInfoList[0].watcher
  const subject = renderToStaticMarkup(<Text name={TranslationEnum.EmailWatcherListHeader} lang={lang} />)
  const content = await createWatchersListEmail(createLinkToPageWatcherDelete, watcherFullInfoList, agencyParams, false)
  const rawEmail = createEmailRawBegin(subject, content, email, agencyParams.emailFrom, agencyParams.emailReplyTo, lang)

  const attachments = await createAttachmentRawFromWatcherList(createImage, watcherFullInfoList)

  return rawEmail + attachments + rawEmailEndPart
}

export const createWatchersListEmail = async (
  createLinkToPageWatcherDelete: (watcherId: ValidString) => Promise<ValidUrl>,
  watcherFullInfoList: WatcherFullInfo[],
  agencyParams: AgencyParams,
  showSvg: boolean
): Promise<string> => {
  const linksToDeleteMap = new Map<string, ValidUrl>()
  const promises = watcherFullInfoList.map(async (item) => {
    linksToDeleteMap.set(item.watcher.id.toString(), await createLinkToPageWatcherDelete(item.watcher.id))
  })

  await Promise.all(promises)

  const content = (
    <EmailWatchersListContent
      watchersFullInfoList={watcherFullInfoList}
      agencyParams={agencyParams}
      showSvg={showSvg}
      linksToDeleteMap={linksToDeleteMap}
    />
  )

  return emailTemplate.replace(/\{content\}/g, renderToStaticMarkup(content))
}
