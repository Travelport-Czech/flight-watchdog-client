import * as moment from 'moment';
export declare const formatSystemDate = "YYYY-MM-DD";
export declare class ValidDate {
    private readonly val;
    constructor(val: any);
    readonly value: string;
    readonly moment: moment.Moment;
    readonly isInPast: () => boolean;
    readonly isToday: () => boolean;
    readonly isInIntervalDays: (days: number) => boolean;
    readonly isBefore: (date: ValidDate) => boolean;
    readonly isAfter: (date: ValidDate) => boolean;
    readonly isSame: (date: ValidDate) => boolean;
    readonly formatToSystem: () => string;
    readonly formatToLocal: () => string;
    readonly formatToLocalDayMonth: () => string;
    readonly formatToLocalWithDayName: () => string;
    toString(): string;
    readonly [Symbol.toStringTag]: string;
    toJSON(): string;
}
