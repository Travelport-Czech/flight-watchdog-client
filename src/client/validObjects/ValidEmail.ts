import { AppError } from 'src/client/errors/AppError'
import { InvalidEmailError } from 'src/client/errors/InvalidEmailError'
import { validateEmail } from 'src/client/utils/validateEmail'
import { ValidString } from 'src/client/validObjects/ValidString'

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
