import { AppError } from 'shared/errors/AppError'
import { InvalidEmailError } from 'shared/errors/InvalidEmailError'
import { validateEmail } from 'shared/utils/validateEmail'
import { ValidString } from 'shared/validObjects/ValidString'

export class ValidEmail extends ValidString {
  // tslint:disable-next-line:no-any
  constructor(val: any) {
    try {
      super(val)
    } catch (err) {
      if (!(err instanceof AppError)) {
        throw err
      }
      throw new InvalidEmailError(err.message)
    }

    if (!validateEmail(this.value)) {
      throw new InvalidEmailError(this.value)
    }
  }
}
