import * as moment from 'moment';
import { formatSystemDate, ValidDate } from 'shared/validObjects/ValidDate';
import { formatSystemDateTime, ValidDateTime } from 'shared/validObjects/ValidDateTime';
const momentDateTime = process.env.STATIC_TIMEBASED === 'true' ? '2018-10-01 12:00:00' : undefined;
export const getActualMoment = () => {
    return moment(momentDateTime);
};
export const getActualDateTime = () => {
    return new ValidDateTime(getActualMoment().format(formatSystemDateTime));
};
export const getActualDate = () => {
    return new ValidDate(getActualMoment().format(formatSystemDate));
};
//# sourceMappingURL=timebased.js.map