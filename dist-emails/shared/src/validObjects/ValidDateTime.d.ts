import { ValidDate } from '@shared/validObjects/ValidDate';
import * as moment from 'moment';
export declare const formatSystemDateTime = "YYYY-MM-DD HH:mm:ss";
export declare class ValidDateTime {
    private readonly val;
    constructor(val: any);
    readonly value: string;
    readonly moment: moment.Moment;
    readonly formatToSystem: () => string;
    readonly formatToSystemDate: () => string;
    readonly getValidDate: () => ValidDate;
    readonly isToday: () => boolean;
    toString(): string;
    readonly [Symbol.toStringTag]: string;
    toJSON(): string;
}
