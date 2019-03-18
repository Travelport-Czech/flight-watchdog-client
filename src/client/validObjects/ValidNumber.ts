import { InvalidNumberError } from 'src/client/errors/InvalidNumberError'

// tslint:disable-next-line:no-any
const validate = (val: any): number => {
  if (typeof val !== 'number') {
    throw new InvalidNumberError(typeof val === 'string' ? val.toString() : '')
  }
  if (val !== parseInt(val.toString(), 10)) {
    throw new InvalidNumberError(val.toString())
  }

  return val
}

export class ValidNumber {
  private readonly val: number

  // tslint:disable-next-line:no-any
  constructor(val: any) {
    this.val = validate(val)
  }

  get value(): number {
    return this.val
  }

  public toString() {
    return this.val.toString()
  }

  get [Symbol.toStringTag]() {
    return this.toString()
  }

  public toJSON() {
    return this.val
  }
}
