import { WatchersGraphPriceHistory } from 'emails/reactComponents/WatchersGraphPriceHistory';
import * as React from 'react';
export class WatcherPriceHistory extends React.Component {
    render() {
        const { watchersFullInfo, showSvg } = this.props;
        const { watcher, searchResults } = watchersFullInfo;
        const imageSrc = 'cid:' + watcher.id.toString();
        return showSvg ? (React.createElement(WatchersGraphPriceHistory, { searchResults: searchResults, priceLimit: watcher.priceLimit, watcher: watcher })) : (React.createElement("img", { src: imageSrc, alt: "Price history" }));
    }
}
//# sourceMappingURL=WatcherPriceHistory.js.map