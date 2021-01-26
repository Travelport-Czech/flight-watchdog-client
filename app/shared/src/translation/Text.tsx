import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { translations } from '@shared/translation/translations'
import { TranslatedText } from '@travelport-czech/ss-translations'
import * as React from 'react'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

interface Props {
  readonly name: TranslationEnum
  readonly lang: SupportedLanguageEnum
}

// tslint:disable-next-line:variable-name
export const Text: React.FunctionComponent<Props> = (props) => {
  const newProps = {
    ...props,
    language: props.lang,
    translations,
  }

  return TranslatedText(newProps)
}
