import { ValidDate } from '@shared/validObjects/ValidDate';
import * as React from 'react';
interface Props {
    readonly departure: ValidDate;
    readonly arrival?: ValidDate;
}
export declare class HeaderDates extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
