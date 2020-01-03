import { PageTokenInvalid } from '@emails/reactComponents/PageTokenInvalid'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const renderPageTokenInvalid = async (agencyParams: AgencyParams, watcherFullInfo: WatcherFullInfo) => {
  return renderToStaticMarkup(<PageTokenInvalid link={agencyParams.frontendUrl} lang={watcherFullInfo.watcher.lang} />)
}
