import { Location } from '@shared/validObjects/Location';
import * as React from 'react';
interface Props {
    readonly locationList: Location[];
}
export declare class LocationNameList extends React.Component<Props> {
    render(): JSX.Element[];
}
export {};
