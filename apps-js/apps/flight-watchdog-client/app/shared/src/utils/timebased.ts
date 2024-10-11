import { formatSystemDate, formatSystemDateTime, ValidDate, ValidDateTime } from '@travelport-czech/valid-objects-ts'
import * as dayjs from 'dayjs'

const momentDateTime: string | undefined = process.env.STATIC_TIMEBASED === 'true' ? '2018-10-01 12:00:00' : undefined

const getActual = (): dayjs.Dayjs => {
    return dayjs(momentDateTime)
}

export const getActualDateTime = (): ValidDateTime => {
    return new ValidDateTime(getActual().format(formatSystemDateTime))
}

export const getActualDate = (): ValidDate => {
    return new ValidDate(getActual().format(formatSystemDate))
}
