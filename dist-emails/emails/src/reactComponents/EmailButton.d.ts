import { TranslationEnum } from '@shared/translation/TranslationEnum';
import { ValidUrl } from '@shared/validObjects/ValidUrl';
import * as React from 'react';
interface Props {
    readonly link: ValidUrl;
    readonly text: TranslationEnum;
    readonly style?: React.CSSProperties;
}
export declare class EmailButton extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
