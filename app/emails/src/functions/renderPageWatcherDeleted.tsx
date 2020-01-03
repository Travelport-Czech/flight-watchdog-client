import { PageWatcherDeleted } from '@emails/reactComponents/PageWatcherDeleted'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const renderPageWatcherDeleted = async (agencyParams: AgencyParams, watcherFullInfo: WatcherFullInfo) => {
  return renderToStaticMarkup(
    <PageWatcherDeleted link={agencyParams.frontendUrl} lang={watcherFullInfo.watcher.lang} />
  )
}
