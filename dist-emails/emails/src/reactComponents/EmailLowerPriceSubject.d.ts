import * as React from 'react';
import { ValidLocationCodeList } from 'shared/validObjects/ValidLocationCodeList';
interface Props {
    readonly origin: ValidLocationCodeList;
    readonly destination: ValidLocationCodeList;
}
export declare class EmailLowerPriceSubject extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
