import * as moment from 'moment'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { getActualDate, getActualMoment } from 'src/client/utils/timebased'
import { InvalidDateError } from 'src/shared/errors/InvalidDateError'
import { Text } from 'src/shared/translation/Text'
import { TranslationEnum } from 'src/shared/translation/TranslationEnum'

const dateRegexp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
export const formatSystemDate = 'YYYY-MM-DD'

// tslint:disable-next-line:no-any
const validate = (val: any): string => {
  if (typeof val !== 'string') {
    throw new InvalidDateError(JSON.stringify(val))
  }
  if (!val) {
    throw new InvalidDateError(val)
  }

  return val
}

const convertToMoment = (val: string): moment.Moment => {
  const result = val.match(dateRegexp)
  if (!result) {
    throw new InvalidDateError(val)
  }
  const momentVal = moment(val, formatSystemDate)
  if (!momentVal.isValid()) {
    throw new InvalidDateError(val)
  }

  return momentVal
}

export class ValidDate {
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

  public readonly isInPast = (): boolean => {
    return this.moment.diff(getActualMoment()) < 0
  }

  public readonly isToday = (): boolean => {
    return getActualDate().formatToSystem() === this.formatToSystem()
  }

  public readonly isInIntervalDays = (days: number): boolean => {
    const limit = getActualMoment().subtract(days, 'days')

    return this.moment.isAfter(limit)
  }

  public readonly isBefore = (date: ValidDate): boolean => {
    return this.moment.isBefore(date.value)
  }

  public readonly isAfter = (date: ValidDate): boolean => {
    return this.moment.isAfter(date.value)
  }

  public readonly isSame = (date: ValidDate): boolean => {
    return this.moment.isSame(date.value)
  }

  public readonly formatToSystem = (): string => {
    return this.moment.format(formatSystemDate)
  }

  public readonly formatToLocal = (): string => {
    return this.moment.format(renderToStaticMarkup(React.createElement(Text, { name: TranslationEnum.FormatDate })))
  }

  public readonly formatToLocalDayMonth = (): string => {
    return this.moment.format(
      renderToStaticMarkup(React.createElement(Text, { name: TranslationEnum.FormatDateDayMonth }))
    )
  }

  public readonly formatToLocalWithDayName = (): string => {
    return this.moment.format(
      renderToStaticMarkup(React.createElement(Text, { name: TranslationEnum.FormatDateWithDayName }))
    )
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
