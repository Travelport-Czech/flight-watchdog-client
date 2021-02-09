import { PageTokenInvalid } from '@emails/reactComponents/PageTokenInvalid'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { AppLogicError } from '@shared/errors/AppLogicError'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const renderPageTokenInvalid = (lang: string): string => {
  const validatedLang = SupportedLanguageEnum[lang]
  if (!validatedLang) {
    throw new AppLogicError(`Not supported language ${lang}`)
  }
  return renderToStaticMarkup(<PageTokenInvalid lang={validatedLang} />)
}
