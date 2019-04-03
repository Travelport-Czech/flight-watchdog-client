import * as React from 'react';
import { LocationName } from 'shared/reactComponents/LocationName';
export class LocationNameList extends React.Component {
    render() {
        return this.props.locationList.map((location, index) => {
            return (React.createElement(React.Fragment, { key: location.code.toString() },
                React.createElement(LocationName, { location: location }),
                index < this.props.locationList.length - 1 ? ', ' : ''));
        });
    }
}
//# sourceMappingURL=LocationNameList.js.map