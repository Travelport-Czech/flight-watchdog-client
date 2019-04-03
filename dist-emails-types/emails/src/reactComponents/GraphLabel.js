import * as React from 'react';
export class GraphLabel extends React.Component {
    render() {
        const { x, y, stroke, value, priceLimit } = this.props;
        const text = value === priceLimit.amount ? priceLimit.amount : value;
        const color = value ? (value >= priceLimit.amount ? '#888' : stroke) : stroke;
        return (React.createElement("text", { x: x, y: y, dy: -10, fill: color, fontSize: 10, textAnchor: "middle" }, text));
    }
}
//# sourceMappingURL=GraphLabel.js.map