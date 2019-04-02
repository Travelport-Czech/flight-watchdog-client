import * as React from 'react'
import { ValidPrice } from 'src/shared/validObjects/ValidPrice'

interface Props {
  readonly x?: number
  readonly y?: number
  readonly stroke?: string
  readonly value?: number
  readonly priceLimit: ValidPrice
}

export class GraphLabel extends React.Component<Props> {
  public render() {
    const { x, y, stroke, value, priceLimit } = this.props

    const text = value === priceLimit.amount ? priceLimit.amount : value

    const color = value ? (value >= priceLimit.amount ? '#888' : stroke) : stroke

    return (
      <text x={x} y={y} dy={-10} fill={color} fontSize={10} textAnchor="middle">
        {text}
      </text>
    )
  }
}
