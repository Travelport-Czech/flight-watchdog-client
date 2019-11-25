import { arrowImage } from '@shared/images/arrowImage'
import * as React from 'react'

interface Props {
  readonly showHtml?: boolean
}

export class ArrowImage extends React.Component<Props> {
  public render() {
    const { showHtml } = this.props

    if (showHtml) {
      return <img src={arrowImage} alt="arrow" />
    }

    return <img src="cid:arrow" alt="arrow" />
  }
}
