import { GraphDot } from '@emails/reactComponents/GraphDot'
import { GraphLabel } from '@emails/reactComponents/GraphLabel'
import { GraphPriceLimitDot } from '@emails/reactComponents/GraphPriceLimitDot'
import { PriceHistoryRecord } from '@emails/types/PriceHistoryRecord'
import { WatcherParams } from '@emails/types/WatcherParams'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { getActualDate } from '@shared/utils/timebased'
import { ValidPrice } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Area, CartesianGrid, ComposedChart, Legend, Line, XAxis, YAxis } from 'recharts'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

interface Props {
    readonly priceHistory: PriceHistoryRecord[]
    readonly priceLimit: ValidPrice
    readonly watcher: WatcherParams
    readonly absolutePosition?: boolean
    readonly lang: SupportedLanguageEnum
}

export class WatchersGraphPriceHistory extends React.Component<Props> {
    public render() {
        const { priceLimit, priceHistory, watcher, absolutePosition, lang } = this.props
        const dateFormat = renderToStaticMarkup(<Text name={TranslationEnum.FormatDateDayMonth} lang={lang} />)
        const actualDate = getActualDate()
        const actualDateMinus15 = actualDate.subtractDays(15)
        const last15Results = priceHistory.filter((item) => {
            return item.created.getValidDate().isAfter(actualDateMinus15)
        })
        const priceLimitLabel = renderToStaticMarkup(<Text name={TranslationEnum.GraphLegendPriceLimit} lang={lang} />)
        const priceTrendLabel = renderToStaticMarkup(<Text name={TranslationEnum.GraphLegendPriceTrend} lang={lang} />)

        const firstPriceHistoryRecord: PriceHistoryRecord = {
            created: watcher.created,
            price: watcher.priceLimit,
        }

        const last15ResultsWithFirst: PriceHistoryRecord[] =
            priceHistory.length > 1 &&
            priceHistory[0].price &&
            priceHistory[0].price.amount !== watcher.priceLimit.amount
                ? [firstPriceHistoryRecord, ...last15Results]
                : last15Results

        const data = last15ResultsWithFirst.map((item) => {
            return {
                datetime: item.created.getValidDate().formatToSystem(),
                limit: priceLimit.amount,
                name: item.created.getValidDate().formatToLocal(dateFormat),
                price: item.price ? item.price.amount : priceLimit.amount,
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
                        name={priceLimitLabel}
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="limit"
                        stroke="#deaf1c"
                        dot={<GraphPriceLimitDot />}
                    />
                    <Area
                        name={priceTrendLabel}
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
