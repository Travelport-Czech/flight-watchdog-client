import { ValidString } from '@shared/validObjects/ValidString';
export declare class ValidFlightType extends ValidString {
    constructor(val: any);
    toString(): 'return' | 'oneway';
    isReturn(): boolean;
    isOneway(): boolean;
}
