import * as moment from 'moment'
import { formatSystemDate, ValidDate } from 'shared/validObjects/ValidDate'
import { formatSystemDateTime, ValidDateTime } from 'shared/validObjects/ValidDateTime'

const momentDateTime: string | undefined = process.env.STATIC_TIMEBASED === 'true' ? '2018-10-01 12:00:00' : undefined

export const getActualMoment = (): moment.Moment => {
  return moment(momentDateTime)
}

export const getActualDateTime = (): ValidDateTime => {
  return new ValidDateTime(getActualMoment().format(formatSystemDateTime))
}

export const getActualDate = (): ValidDate => {
  return new ValidDate(getActualMoment().format(formatSystemDate))
}
