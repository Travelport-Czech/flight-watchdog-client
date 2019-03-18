import { AppError } from 'src/client/errors/AppError'
import { InvalidLocationError } from 'src/client/errors/InvalidLocationError'
import { ValidString } from 'src/client/validObjects/ValidString'

const inputRegexp = new RegExp(/^[A-Z]{3}$/)

const validate = (val: string): void => {
  if (!inputRegexp.test(val)) {
    throw new InvalidLocationError(val)
  }
}

export class ValidLocationCode extends ValidString {
  // tslint:disable-next-line:no-any
  constructor(val: any) {
    try {
      super(val)
    } catch (err) {
      if (!(err instanceof AppError)) {
        throw err
      }
      throw new InvalidLocationError(err.message)
    }
    validate(this.value)
  }
}
