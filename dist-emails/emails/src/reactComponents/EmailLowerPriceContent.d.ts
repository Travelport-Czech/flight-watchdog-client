import { WatcherFullInfo } from '@emails/types/WatcherFullInfo';
import { ValidPrice } from '@shared/validObjects/ValidPrice';
import * as React from 'react';
interface Props {
    readonly watcherFullInfo: WatcherFullInfo;
    readonly price: ValidPrice;
    readonly showSvg?: boolean;
}
export declare class EmailLowerPriceContent extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
