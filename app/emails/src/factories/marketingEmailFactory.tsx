import { createAttachmentRawFromWatcherList, createEmailRawBegin } from '@emails/factories/emailFactory'
import { emailTemplate, rawEmailEndPart } from '@emails/factories/emailTemplates'
import { EmailMarketingContent } from '@emails/reactComponents/EmailMarketingContent'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

export const createMarketingEmailRaw = async (
    createImage: (html: string, width: number, height: number) => Promise<string>,
    createLinkToPageWatcherDelete: (watcherId: string) => Promise<string>,
    watcherFullInfoList: WatcherFullInfo[],
    lang: SupportedLanguageEnum,
    agencyParams: AgencyParams,
): Promise<string> => {
    const { email } = watcherFullInfoList[0].watcher
    const subject = renderToStaticMarkup(<Text name={TranslationEnum.EmailMarketingHeader} lang={lang} />)
    const content = await createMarketingEmail(
        createLinkToPageWatcherDelete,
        watcherFullInfoList,
        lang,
        agencyParams,
        false,
    )
    const rawEmail = createEmailRawBegin(
        subject,
        content,
        email,
        agencyParams.emailFrom,
        agencyParams.emailReplyTo,
        lang,
    )

    const attachments = await createAttachmentRawFromWatcherList(createImage, watcherFullInfoList, lang)

    return rawEmail + attachments + rawEmailEndPart
}

export const createMarketingEmail = async (
    createLinkToPageWatcherDelete: (watcherId: string) => Promise<string>,
    watcherFullInfoList: WatcherFullInfo[],
    lang: SupportedLanguageEnum,
    agencyParams: AgencyParams,
    showSvg: boolean,
): Promise<string> => {
    const linksToDeleteMap = new Map<string, string>()
    const promises = watcherFullInfoList.map(async (item) => {
        linksToDeleteMap.set(item.watcher.id.toString(), await createLinkToPageWatcherDelete(item.watcher.id))
    })

    await Promise.all(promises)

    const content = (
        <EmailMarketingContent
            watchersFullInfoList={watcherFullInfoList}
            showSvg={showSvg}
            agencyParams={agencyParams}
            linksToDeleteMap={linksToDeleteMap}
            lang={lang}
        />
    )

    return emailTemplate.replace(/\{content\}/g, renderToStaticMarkup(content))
}
