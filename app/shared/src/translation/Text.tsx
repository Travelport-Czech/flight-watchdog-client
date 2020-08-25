import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { translations } from '@shared/translation/translations'
import { TranslatedText } from '@travelport-czech/ss-translations'
import { ValidLanguage } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'

interface Props {
  readonly name: TranslationEnum
  readonly lang: ValidLanguage
}

// tslint:disable-next-line:variable-name
export const Text: React.FunctionComponent<Props> = (props) => {
  const newProps = {
    ...props,
    language: props.lang.toString(),
    translations
  }

  return TranslatedText(newProps)
}
