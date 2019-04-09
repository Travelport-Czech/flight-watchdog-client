import { ValidLanguage } from '@ceesystems/valid-objects-ts'
import { AppLogicError } from '@shared/errors/AppLogicError'
import { csTranslation } from '@shared/translation/csTranslation'
import { enTranslation } from '@shared/translation/enTranslation'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { TranslationKeys } from '@shared/translation/TranslationKeys'
import * as moment from 'moment'
import * as React from 'react'

let language: ValidLanguage | undefined

const momentTransformTable = {
  [SupportedLanguageEnum.cs]: 'cs',
  [SupportedLanguageEnum.en]: 'en-GB'
}

const getTranslationTable = (): TranslationKeys => {
  if (!language) {
    throw new AppLogicError('Language not defined.')
  }
  if (language.toString() === SupportedLanguageEnum.cs) {
    return csTranslation
  }

  if (language.toString() === SupportedLanguageEnum.en) {
    return enTranslation
  }

  throw new AppLogicError('Language not supported.')
}

export const initializeTranslator = (changeLanguage: ValidLanguage): void => {
  language = changeLanguage
  const lang = momentTransformTable[language.toString()]
  if (typeof lang !== 'string') {
    throw new AppLogicError('Language not supported.')
  }
  moment.locale(lang)
}

export const getLanguage = (): ValidLanguage => {
  if (!language) {
    throw new AppLogicError('Language not defined.')
  }

  return language
}

export const translate = (name: TranslationEnum, params: string[] = []): string => {
  if (!language) {
    throw new AppLogicError('Language not defined.')
  }

  const table = getTranslationTable()
  if (!table.hasOwnProperty(name)) {
    throw new AppLogicError('Missing translation key ' + name + ' for language ' + language.toString())
  }

  const template: string = table[name]
  const parts = template.split('{?}')
  if (parts.length - 1 !== params.length) {
    throw new AppLogicError(
      'Text component must have ' +
        (parts.length - 1).toString() +
        ' (now have ' +
        params.length.toString() +
        ') children for template (' +
        name.toString() +
        "): '" +
        template +
        "'"
    )
  }

  return parts.reduce(
    (acc: string, current: string, index: number): string => {
      return acc + current.replace('{_}', '\u00a0') + params[index]
    }
  )
}

interface Props {
  readonly name: TranslationEnum
}

export class Text extends React.Component<Props> {
  public render() {
    if (!language) {
      throw new AppLogicError('Language not defined.')
    }

    const key = this.props.name
    const table = getTranslationTable()
    if (!table.hasOwnProperty(key)) {
      throw new AppLogicError('Missing translation key ' + key + ' for language ' + language.toString())
    }

    const template: string = table[key]
    const parts = template.split('{?}')
    const children = React.Children.toArray(this.props.children)
    if (parts.length - 1 !== children.length) {
      throw new AppLogicError(
        'Text component must have ' +
          (parts.length - 1).toString() +
          ' (now have ' +
          children.length.toString() +
          ') children for template (' +
          key.toString() +
          "): '" +
          template +
          "'"
      )
    }
    const result = parts.reduce((acc: React.ReactNode[], current: string, index: number): React.ReactNode[] => {
      acc.push(
        <React.Fragment key={index}>
          {current.replace('{_}', '\u00a0')}
          {children[index]}
        </React.Fragment>
      )

      return acc
    }, [])

    return <React.Fragment>{result}</React.Fragment>
  }
}
