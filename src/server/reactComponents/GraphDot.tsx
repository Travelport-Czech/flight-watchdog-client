import * as React from 'react'

interface Props {
  readonly cx?: number
  readonly cy?: number
  readonly stroke?: string
}

export class GraphDot extends React.Component<Props> {
  public render() {
    const { cx, cy, stroke } = this.props

    return <circle cx={cx} cy={cy} r={2} stroke={stroke} strokeWidth={2} fill={stroke} />
  }
}
