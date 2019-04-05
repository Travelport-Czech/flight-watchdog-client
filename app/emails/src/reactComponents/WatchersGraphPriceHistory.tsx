import { GraphDot } from '@emails/reactComponents/GraphDot'
import { GraphLabel } from '@emails/reactComponents/GraphLabel'
import { GraphPriceLimitDot } from '@emails/reactComponents/GraphPriceLimitDot'
import { SearchResult } from '@emails/types/SearchResult'
import { WatcherParams } from '@emails/types/WatcherParams'
import { translate } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidPrice } from '@shared/validObjects/ValidPrice'
import * as React from 'react'
import { Area, CartesianGrid, ComposedChart, Legend, Line, XAxis, YAxis } from 'recharts'

interface Props {
  readonly searchResults: SearchResult[]
  readonly priceLimit: ValidPrice
  readonly watcher: WatcherParams
  readonly absolutePosition?: boolean
}

export class WatchersGraphPriceHistory extends React.Component<Props> {
  public render() {
    const { priceLimit, searchResults, watcher, absolutePosition } = this.props

    const last15Results = searchResults.filter(
      (item: SearchResult): boolean => {
        return item.created.getValidDate().isInIntervalDays(15)
      }
    )

    const firstSearchResult: SearchResult = {
      origin: watcher.origin,
      destination: watcher.destination,
      flightType: watcher.flightType,
      departure: watcher.departure,
      arrival: watcher.arrival ? watcher.arrival : undefined,
      created: watcher.created,
      price: watcher.priceLimit
    }

    const last15ResultsWithFirst: SearchResult[] =
      searchResults.length > 1 && searchResults[0].price && searchResults[0].price.amount !== watcher.priceLimit.amount
        ? [firstSearchResult, ...last15Results]
        : last15Results

    const data = last15ResultsWithFirst.map((item: SearchResult) => {
      return {
        datetime: item.created.getValidDate().formatToSystem(),
        limit: priceLimit.amount,
        name: item.created.getValidDate().formatToLocalDayMonth(),
        price: item.price ? item.price.amount : priceLimit.amount
      }
    })

    if (data.length === 0) {
      return ''
    }

    const style: React.CSSProperties = absolutePosition ? { position: 'absolute', top: '0', left: '0' } : {}

    return (
      <div style={{ ...style }}>
        <ComposedChart width={600} height={200} data={data} margin={{ bottom: 20, top: 20 }}>
          <XAxis dataKey="name" padding={{ left: 10, right: 10 }} tick={{ fontSize: 10 }} />
          <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} />
          <CartesianGrid stroke="#eee" strokeDasharray="3 5" />
          <Legend verticalAlign="top" wrapperStyle={{ top: '170px', fontSize: '10px' }} iconType="line" />
          <Line
            name={translate(TranslationEnum.GraphLegendPriceLimit)}
            isAnimationActive={false}
            type="monotone"
            dataKey="limit"
            stroke="#deaf1c"
            dot={<GraphPriceLimitDot />}
          />
          <Area
            name={translate(TranslationEnum.GraphLegendPriceTrend)}
            isAnimationActive={false}
            type="monotone"
            dataKey="price"
            fillOpacity={0.2}
            fill="#5d92da"
            stroke="#3c68a5"
            dot={<GraphDot />}
            label={<GraphLabel priceLimit={priceLimit} />}
          />
        </ComposedChart>
      </div>
    )
  }
}
