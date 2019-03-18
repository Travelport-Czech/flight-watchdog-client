import { InvalidStringError } from 'src/client/errors/InvalidStringError'

// tslint:disable-next-line:no-any
const validate = (val: any): string => {
  if (typeof val !== 'string') {
    throw new InvalidStringError(JSON.stringify(val) + ' is type ' + typeof val)
  }
  if (!val) {
    throw new InvalidStringError(val)
  }

  return val
}

export class ValidString {
  private readonly val: string

  // tslint:disable-next-line:no-any
  constructor(val: any) {
    this.val = validate(val)
  }

  get value(): string {
    return this.val
  }

  public isSame(second: ValidString): boolean {
    return this.toString() === second.toString()
  }

  public isNotSame(second: ValidString): boolean {
    return !this.isSame(second)
  }

  public toString() {
    return this.val
  }

  get [Symbol.toStringTag]() {
    return this.toString()
  }

  public toJSON() {
    return this.toString()
  }
}
