import { createWatcherListEmailRaw } from '@emails/factories/watcherListEmailFactory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { initializeTranslator } from '@shared/translation/Text'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const sendWatcherListEmail = async (
  sendEmail: (content: string) => Promise<void>,
  createImage: (html: string, width: number, height: number) => Promise<string>,
  watcherFullInfoList: WatcherFullInfo[],
  agencyParams: AgencyParams
) => {
  initializeTranslator(watcherFullInfoList[0].watcher.lang)

  const emailContent = await createWatcherListEmailRaw(createImage, watcherFullInfoList, agencyParams)

  await sendEmail(emailContent)
}
