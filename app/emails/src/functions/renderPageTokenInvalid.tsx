import { PageTokenInvalid } from '@emails/reactComponents/PageTokenInvalid'
import { ValidLanguage } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const renderPageTokenInvalid = (lang: ValidLanguage): string => {
  return renderToStaticMarkup(<PageTokenInvalid lang={lang} />)
}
