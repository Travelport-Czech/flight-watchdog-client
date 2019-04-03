import * as React from 'react';
import { TranslationEnum } from 'shared/translation/TranslationEnum';
import { ValidUrl } from 'shared/validObjects/ValidUrl';
interface Props {
    readonly link: ValidUrl;
    readonly text: TranslationEnum;
    readonly style?: React.CSSProperties;
}
export declare class EmailButton extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
