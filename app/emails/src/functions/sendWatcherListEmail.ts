import { createWatcherListEmailRaw } from '@emails/factories/watcherListEmailFactory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { ValidNotEmptyString } from '@travelport-czech/valid-objects-ts'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const sendWatcherListEmail = async (
  sendEmail: (content: string) => Promise<void>,
  createImage: (html: string, width: number, height: number) => Promise<string>,
  createLinkToPageWatcherDelete: (watcherId: ValidNotEmptyString) => Promise<string>,
  watcherFullInfoList: WatcherFullInfo[],
  agencyParams: AgencyParams
) => {
  const emailContent = await createWatcherListEmailRaw(
    createImage,
    createLinkToPageWatcherDelete,
    watcherFullInfoList,
    agencyParams
  )

  await sendEmail(emailContent)
}
