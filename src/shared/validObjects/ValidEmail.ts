import { validateEmail } from 'src/client/utils/validateEmail'
import { AppError } from 'src/shared/errors/AppError'
import { InvalidEmailError } from 'src/shared/errors/InvalidEmailError'
import { ValidString } from 'src/shared/validObjects/ValidString'

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
