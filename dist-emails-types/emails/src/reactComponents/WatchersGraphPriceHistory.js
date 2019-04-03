import { GraphDot } from 'emails/reactComponents/GraphDot';
import { GraphLabel } from 'emails/reactComponents/GraphLabel';
import { GraphPriceLimitDot } from 'emails/reactComponents/GraphPriceLimitDot';
import * as React from 'react';
import { Area, CartesianGrid, ComposedChart, Legend, Line, XAxis, YAxis } from 'recharts';
import { translate } from 'shared/translation/Text';
import { TranslationEnum } from 'shared/translation/TranslationEnum';
export class WatchersGraphPriceHistory extends React.Component {
    render() {
        const { priceLimit, searchResults, watcher, absolutePosition } = this.props;
        const last15Results = searchResults.filter((item) => {
            return item.created.getValidDate().isInIntervalDays(15);
        });
        const firstSearchResult = {
            origin: watcher.origin,
            destination: watcher.destination,
            flightType: watcher.flightType,
            departure: watcher.departure,
            arrival: watcher.arrival ? watcher.arrival : undefined,
            created: watcher.created,
            price: watcher.priceLimit
        };
        const last15ResultsWithFirst = searchResults.length > 1 && searchResults[0].price && searchResults[0].price.amount !== watcher.priceLimit.amount
            ? [firstSearchResult, ...last15Results]
            : last15Results;
        const data = last15ResultsWithFirst.map((item) => {
            return {
                datetime: item.created.getValidDate().formatToSystem(),
                limit: priceLimit.amount,
                name: item.created.getValidDate().formatToLocalDayMonth(),
                price: item.price ? item.price.amount : priceLimit.amount
            };
        });
        if (data.length === 0) {
            return '';
        }
        const style = absolutePosition ? { position: 'absolute', top: '0', left: '0' } : {};
        return (React.createElement("div", { style: { ...style } },
            React.createElement(ComposedChart, { width: 600, height: 200, data: data, margin: { bottom: 20, top: 20 } },
                React.createElement(XAxis, { dataKey: "name", padding: { left: 10, right: 10 }, tick: { fontSize: 10 } }),
                React.createElement(YAxis, { domain: ['auto', 'auto'], tick: { fontSize: 10 } }),
                React.createElement(CartesianGrid, { stroke: "#eee", strokeDasharray: "3 5" }),
                React.createElement(Legend, { verticalAlign: "top", wrapperStyle: { top: '170px', fontSize: '10px' }, iconType: "line" }),
                React.createElement(Line, { name: translate(TranslationEnum.GraphLegendPriceLimit), isAnimationActive: false, type: "monotone", dataKey: "limit", stroke: "#deaf1c", dot: React.createElement(GraphPriceLimitDot, null) }),
                React.createElement(Area, { name: translate(TranslationEnum.GraphLegendPriceTrend), isAnimationActive: false, type: "monotone", dataKey: "price", fillOpacity: 0.2, fill: "#5d92da", stroke: "#3c68a5", dot: React.createElement(GraphDot, null), label: React.createElement(GraphLabel, { priceLimit: priceLimit }) }))));
    }
}
//# sourceMappingURL=WatchersGraphPriceHistory.js.map