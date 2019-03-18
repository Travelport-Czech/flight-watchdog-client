import * as React from 'react'
import { LocationName } from 'src/client/reactComponents/LocationName'
import { Location } from 'src/client/validObjects/Location'

interface Props {
  readonly locationList: Location[]
}

export class LocationNameList extends React.Component<Props> {
  public render() {
    return this.props.locationList.map((location: Location, index: number) => {
      return (
        <React.Fragment key={location.code.toString()}>
          <LocationName location={location} />
          {index < this.props.locationList.length - 1 ? ', ' : ''}
        </React.Fragment>
      )
    })
  }
}
