import { ValidLocationCode } from 'shared/validObjects/ValidLocationCode';
import { ValidString } from 'shared/validObjects/ValidString';
export declare class ValidLocationCodeList extends ValidString {
    private readonly locationCodes;
    constructor(val: any);
    readonly codes: ValidLocationCode[];
}
