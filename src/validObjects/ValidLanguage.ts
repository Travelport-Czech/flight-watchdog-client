import { AppError } from 'src/errors/AppError'
import { InvalidLanguageError } from 'src/errors/InvalidLanguageError'
import { SupportedLanguageEnum } from 'src/translation/SupportedLanguageEnum'
import { ValidString } from 'src/validObjects/ValidString'

const validate = (lang: string): void => {
  if (!Object.values(SupportedLanguageEnum).includes(lang)) {
    throw new InvalidLanguageError(lang)
  }
}

export class ValidLanguage extends ValidString {
  // tslint:disable-next-line:no-any
  constructor(val: any) {
    try {
      super(val)
    } catch (err) {
      if (!(err instanceof AppError)) {
        throw err
      }
      throw new InvalidLanguageError(err.message)
    }
    validate(this.value)
  }
}
