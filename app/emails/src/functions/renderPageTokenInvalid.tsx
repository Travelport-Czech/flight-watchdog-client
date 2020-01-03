import { PageTokenInvalid } from '@emails/reactComponents/PageTokenInvalid'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { ValidLanguage } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const renderPageTokenInvalid = (): string => {
  const lang = new ValidLanguage(SupportedLanguageEnum.en, Object.values(SupportedLanguageEnum))

  return renderToStaticMarkup(<PageTokenInvalid lang={lang} />)
}
