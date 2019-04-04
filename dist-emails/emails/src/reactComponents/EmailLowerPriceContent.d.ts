import { WatcherFullInfo } from 'emails/types/WatcherFullInfo';
import * as React from 'react';
import { ValidPrice } from 'shared/validObjects/ValidPrice';
interface Props {
    readonly watcherFullInfo: WatcherFullInfo;
    readonly price: ValidPrice;
    readonly showSvg?: boolean;
}
export declare class EmailLowerPriceContent extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
