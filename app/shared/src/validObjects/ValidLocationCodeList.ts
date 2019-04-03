import { AppError } from 'shared/errors/AppError'
import { InvalidLocationError } from 'shared/errors/InvalidLocationError'
import { ValidLocationCode } from 'shared/validObjects/ValidLocationCode'
import { ValidString } from 'shared/validObjects/ValidString'

const inputRegexp = new RegExp(/^[A-Z]{3}(\/[A-Z]{3})*$/)

const validate = (val: string): string => {
  if (!inputRegexp.test(val)) {
    throw new InvalidLocationError(val)
  }

  return val
}

export class ValidLocationCodeList extends ValidString {
  private readonly locationCodes: ValidLocationCode[]

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
    this.locationCodes = validate(this.value)
      .split('/')
      .map((code: string) => {
        return new ValidLocationCode(code)
      })
  }

  get codes(): ValidLocationCode[] {
    return this.locationCodes
  }
}
