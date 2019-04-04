import * as React from 'react';
import { Location } from 'shared/validObjects/Location';
interface Props {
    readonly locationList: Location[];
}
export declare class LocationNameList extends React.Component<Props> {
    render(): JSX.Element[];
}
export {};
