import { ValidLocationCodeList } from '@shared/validObjects/ValidLocationCodeList';
import * as React from 'react';
interface Props {
    readonly origin: ValidLocationCodeList;
    readonly destination: ValidLocationCodeList;
}
export declare class EmailLowerPriceSubject extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
