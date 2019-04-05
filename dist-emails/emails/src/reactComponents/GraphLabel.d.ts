import { ValidPrice } from '@shared/validObjects/ValidPrice';
import * as React from 'react';
interface Props {
    readonly x?: number;
    readonly y?: number;
    readonly stroke?: string;
    readonly value?: number;
    readonly priceLimit: ValidPrice;
}
export declare class GraphLabel extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
