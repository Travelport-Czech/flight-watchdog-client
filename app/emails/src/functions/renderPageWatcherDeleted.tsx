import { PageWatcherDeleted } from '@emails/reactComponents/PageWatcherDeleted'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherParams } from '@emails/types/WatcherParams'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const renderPageWatcherDeleted = (agencyParams: AgencyParams, watcher: WatcherParams): string => {
  return renderToStaticMarkup(<PageWatcherDeleted link={agencyParams.frontendUrl} lang={watcher.lang} />)
}
