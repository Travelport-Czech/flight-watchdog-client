import { WatcherFullInfo } from '@emails/types/WatcherFullInfo';
import * as React from 'react';
interface Props {
    readonly watchersFullInfo: WatcherFullInfo;
    readonly showSvg?: boolean;
}
export declare class WatcherPriceHistory extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
