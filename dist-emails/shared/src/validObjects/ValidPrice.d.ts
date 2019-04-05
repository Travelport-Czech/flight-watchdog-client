import { ValidString } from '@shared/validObjects/ValidString';
export declare class ValidPrice extends ValidString {
    private readonly amm;
    private readonly curr;
    constructor(val: any);
    readonly currency: string;
    readonly amount: number;
    subtract(price: ValidPrice): ValidPrice;
    isSame(price: ValidPrice): boolean;
    isHigherThan(price: ValidPrice): boolean;
    diffPercent(lowerPrice: ValidPrice): number;
    formatToLocale(): string;
    toString(): string;
    private checkCurrency;
}
