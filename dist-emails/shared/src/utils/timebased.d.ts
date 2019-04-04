import * as moment from 'moment';
import { ValidDate } from 'shared/validObjects/ValidDate';
import { ValidDateTime } from 'shared/validObjects/ValidDateTime';
export declare const getActualMoment: () => moment.Moment;
export declare const getActualDateTime: () => ValidDateTime;
export declare const getActualDate: () => ValidDate;
