import { TranslationEnum } from '@shared/translation/TranslationEnum';
import { ValidLanguage } from '@shared/validObjects/ValidLanguage';
import * as React from 'react';
export declare const initializeTranslator: (changeLanguage: ValidLanguage) => void;
export declare const getLanguage: () => ValidLanguage;
export declare const translate: (name: TranslationEnum, params?: string[]) => string;
interface Props {
    readonly name: TranslationEnum;
}
export declare class Text extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
