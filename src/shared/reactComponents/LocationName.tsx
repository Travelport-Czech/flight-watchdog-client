import * as React from 'react'
import { Location } from 'src/shared/validObjects/Location'

interface Props {
  readonly location: Location
}

export class LocationName extends React.Component<Props> {
  public render() {
    const { code, name } = this.props.location

    if (!name) {
      return <React.Fragment>{code.toString()}</React.Fragment>
    }

    return (
      <React.Fragment>
        {name}&nbsp;({code.toString()})
      </React.Fragment>
    )
  }
}
