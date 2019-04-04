export declare class ValidString {
    private readonly val;
    constructor(val: any);
    readonly value: string;
    isSame(second: ValidString): boolean;
    isNotSame(second: ValidString): boolean;
    toString(): string;
    readonly [Symbol.toStringTag]: string;
    toJSON(): string;
}
