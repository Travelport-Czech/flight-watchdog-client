import { PageWatcherDeleted } from '@emails/reactComponents/PageWatcherDeleted'
import { AgencyParams } from '@emails/types/AgencyParams'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const renderPageWatcherDeleted = (agencyParams: AgencyParams, lang: SupportedLanguageEnum): string => {
  return renderToStaticMarkup(<PageWatcherDeleted link={agencyParams.frontendUrl} lang={lang} />)
}
