import { AppLogicError } from '@shared/errors/AppLogicError'
import { csTranslation } from '@shared/translation/csTranslation'
import { enTranslation } from '@shared/translation/enTranslation'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { TranslationKeys } from '@shared/translation/TranslationKeys'
import { ValidLanguage } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'

const getTranslationTable = (language: ValidLanguage): TranslationKeys => {
  if (language.toString() === SupportedLanguageEnum.cs) {
    return csTranslation
  }

  if (language.toString() === SupportedLanguageEnum.en) {
    return enTranslation
  }

  throw new AppLogicError('Language not supported.')
}

interface Props {
  readonly name: TranslationEnum
  readonly lang: ValidLanguage
}

export class Text extends React.Component<Props> {
  public render() {
    const { name, lang } = this.props

    const table = getTranslationTable(lang)
    if (!table.hasOwnProperty(name)) {
      throw new AppLogicError('Missing translation key ' + name + ' for language ' + lang.toString())
    }

    const template: string = table[name]
    const parts = template.split('{?}')
    const children = React.Children.toArray(this.props.children)
    if (parts.length - 1 !== children.length) {
      throw new AppLogicError(
        'Text component must have ' +
          (parts.length - 1).toString() +
          ' (now have ' +
          children.length.toString() +
          ') children for template (' +
          name.toString() +
          "): '" +
          template +
          "'"
      )
    }
    const result = parts.reduce((acc: React.ReactNode[], current: string, index: number): React.ReactNode[] => {
      acc.push(
        <React.Fragment key={index}>
          {current.replace(/{_}/g, '\u00a0')}
          {children[index]}
        </React.Fragment>
      )

      return acc
    }, [])

    return <React.Fragment>{result}</React.Fragment>
  }
}
