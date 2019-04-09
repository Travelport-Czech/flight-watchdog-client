import { formatSystemDate, formatSystemDateTime, ValidDate, ValidDateTime } from '@ceesystems/valid-objects-ts'
import * as moment from 'moment'

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
