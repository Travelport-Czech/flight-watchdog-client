import { createMarketingEmailRaw } from '@emails/factories/marketingEmailFactory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { ValidString, ValidUrl } from '@travelport-czech/valid-objects-ts'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const sendMarketingEmail = async (
  sendEmail: (content: string) => Promise<void>,
  createImage: (html: string, width: number, height: number) => Promise<string>,
  createLinkToPageWatcherDelete: (watcherId: ValidString) => ValidUrl,
  watcherFullInfoList: WatcherFullInfo[],
  agencyParams: AgencyParams
) => {
  const emailContent = await createMarketingEmailRaw(
    createImage,
    createLinkToPageWatcherDelete,
    watcherFullInfoList,
    agencyParams
  )

  await sendEmail(emailContent)
}
