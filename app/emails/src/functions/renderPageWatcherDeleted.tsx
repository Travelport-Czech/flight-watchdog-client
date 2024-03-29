import { PageWatcherDeleted } from '@emails/reactComponents/PageWatcherDeleted'
import { AgencyParams } from '@emails/types/AgencyParams'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { AppLogicError } from '@shared/errors/AppLogicError'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const renderPageWatcherDeleted = (agencyParams: AgencyParams, lang: string): string => {
    const validatedLang = SupportedLanguageEnum[lang]
    if (!validatedLang) {
        throw new AppLogicError(`Not supported language ${lang}`)
    }
    return renderToStaticMarkup(<PageWatcherDeleted link={agencyParams.frontendUrl} lang={validatedLang} />)
}
