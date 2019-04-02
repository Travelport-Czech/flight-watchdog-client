import { AppError } from 'src/shared/errors/AppError'
import { ValidString } from 'src/shared/validObjects/ValidString'

const validate = (val: string): 'return' | 'oneway' => {
  if (val === 'return') {
    return val
  }

  if (val === 'oneway') {
    return val
  }

  throw new AppError(`Bad Flight type: ${val}`)
}

export class ValidFlightType extends ValidString {
  // tslint:disable-next-line:no-any
  constructor(val: any) {
    try {
      super(val)
    } catch (err) {
      if (!(err instanceof AppError)) {
        throw err
      }
      throw new AppError(`Flight type is not string: ${err.message}`)
    }
    validate(this.value)
  }

  public toString(): 'return' | 'oneway' {
    return validate(this.value)
  }

  public isReturn(): boolean {
    return this.value === 'return'
  }

  public isOneway(): boolean {
    return this.value === 'oneway'
  }
}
