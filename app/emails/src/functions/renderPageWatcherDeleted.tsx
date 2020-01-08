import { PageWatcherDeleted } from '@emails/reactComponents/PageWatcherDeleted'
import { AgencyParams } from '@emails/types/AgencyParams'
import { ValidLanguage } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const renderPageWatcherDeleted = (agencyParams: AgencyParams, lang: ValidLanguage): string => {
  return renderToStaticMarkup(<PageWatcherDeleted link={agencyParams.frontendUrl} lang={lang} />)
}
