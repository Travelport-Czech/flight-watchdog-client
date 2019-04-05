import { SearchResult } from '@emails/types/SearchResult';
import { WatcherParams } from '@emails/types/WatcherParams';
import { ValidPrice } from '@shared/validObjects/ValidPrice';
import * as React from 'react';
interface Props {
    readonly searchResults: SearchResult[];
    readonly priceLimit: ValidPrice;
    readonly watcher: WatcherParams;
    readonly absolutePosition?: boolean;
}
export declare class WatchersGraphPriceHistory extends React.Component<Props> {
    render(): JSX.Element | "";
}
export {};
