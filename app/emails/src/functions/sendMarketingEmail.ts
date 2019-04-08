import { createMarketingEmailRaw } from '@emails/factories/marketingEmailFactory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { initializeTranslator } from '@shared/translation/Text'
import * as React from 'react'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const sendMarketingEmail = async (
  sendEmail: (content: string) => Promise<void>,
  createImage: (reactElement: React.ReactElement<{}>, width: number, height: number) => Promise<string>,
  watcherFullInfoList: WatcherFullInfo[],
  agencyParams: AgencyParams
) => {
  initializeTranslator(watcherFullInfoList[0].watcher.lang)

  const emailContent = await createMarketingEmailRaw(createImage, watcherFullInfoList, agencyParams)

  await sendEmail(emailContent)
}
