import { createWatcherListEmailRaw } from '@emails/factories/watcherListEmailFactory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { AppLogicError } from '@shared/errors/AppLogicError'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const sendWatcherListEmail = async (
  sendEmail: (content: string) => Promise<void>,
  createImage: (html: string, width: number, height: number) => Promise<string>,
  createLinkToPageWatcherDelete: (watcherId: string) => Promise<string>,
  watcherFullInfoList: WatcherFullInfo[],
  lang: string,
  agencyParams: AgencyParams
) => {
  const validatedLang = SupportedLanguageEnum[lang]
  if (!validatedLang) {
    throw new AppLogicError(`Not supported language ${lang}`)
  }

  const emailContent = await createWatcherListEmailRaw(
    createImage,
    createLinkToPageWatcherDelete,
    watcherFullInfoList,
    validatedLang,
    agencyParams
  )

  await sendEmail(emailContent)
}
