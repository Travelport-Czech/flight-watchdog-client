import * as React from 'react';
export class GraphDot extends React.Component {
    render() {
        const { cx, cy, stroke } = this.props;
        return React.createElement("circle", { cx: cx, cy: cy, r: 2, stroke: stroke, strokeWidth: 2, fill: stroke });
    }
}
//# sourceMappingURL=GraphDot.js.map