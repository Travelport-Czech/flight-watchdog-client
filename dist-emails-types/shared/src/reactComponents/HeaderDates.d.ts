import * as React from 'react';
import { ValidDate } from 'shared/validObjects/ValidDate';
interface Props {
    readonly departure: ValidDate;
    readonly arrival?: ValidDate;
}
export declare class HeaderDates extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
