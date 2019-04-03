import * as React from 'react';
export class LocationName extends React.Component {
    render() {
        const { code, name } = this.props.location;
        if (!name) {
            return React.createElement(React.Fragment, null, code.toString());
        }
        return (React.createElement(React.Fragment, null,
            name,
            "\u00A0(",
            code.toString(),
            ")"));
    }
}
//# sourceMappingURL=LocationName.js.map