import * as moment from 'moment'
import { InvalidDateTimeError } from 'src/client/errors/InvalidDateTimeError'
import { ValidDate } from 'src/client/validObjects/ValidDate'

const dateRegexp = /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/
export const formatSystemDateTime = 'YYYY-MM-DD HH:mm:ss'

// tslint:disable-next-line:no-any
const validate = (val: any): string => {
  if (typeof val !== 'string') {
    throw new InvalidDateTimeError(JSON.stringify(val))
  }
  if (!val) {
    throw new InvalidDateTimeError(val)
  }

  return val
}

const convertToMoment = (val: string): moment.Moment => {
  const result = val.match(dateRegexp)
  if (!result) {
    throw new InvalidDateTimeError(val)
  }
  const momentVal = moment(val, formatSystemDateTime)
  if (!momentVal.isValid()) {
    throw new InvalidDateTimeError(val)
  }

  return momentVal
}

export class ValidDateTime {
  private readonly val: string

  // tslint:disable-next-line:no-any
  constructor(val: any) {
    this.val = validate(val)
    convertToMoment(this.val)
  }

  get value(): string {
    return this.val
  }

  get moment(): moment.Moment {
    return convertToMoment(this.val)
  }

  public readonly formatToSystem = (): string => {
    return this.moment.format(formatSystemDateTime)
  }

  public readonly formatToSystemDate = (): string => {
    return this.moment.format(formatSystemDateTime)
  }

  public readonly getValidDate = (): ValidDate => {
    return new ValidDate(this.formatToSystemDate().substring(0, 10))
  }

  public readonly isToday = (): boolean => {
    return this.getValidDate().isToday()
  }

  public toString() {
    return this.formatToSystem()
  }

  get [Symbol.toStringTag]() {
    return this.toString()
  }

  public toJSON() {
    return this.toString()
  }
}
