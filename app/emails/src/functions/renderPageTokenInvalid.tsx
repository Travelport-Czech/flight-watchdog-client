import { PageTokenInvalid } from '@emails/reactComponents/PageTokenInvalid'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const renderPageTokenInvalid = (lang: SupportedLanguageEnum): string => {
  return renderToStaticMarkup(<PageTokenInvalid lang={lang} />)
}
