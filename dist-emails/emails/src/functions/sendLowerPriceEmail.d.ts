import { WatcherFullInfo } from '@emails/types/WatcherFullInfo';
import { ValidEmail } from '@shared/validObjects/ValidEmail';
import { ValidPrice } from '@shared/validObjects/ValidPrice';
import * as React from 'react';
export declare const sendLowerPriceEmail: (sendEmail: (content: string) => Promise<void>, createImage: (reactElement: React.ReactElement<{}, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, width: number, height: number) => Promise<string>, watcherFullInfo: WatcherFullInfo, price: ValidPrice, emailFrom: ValidEmail) => Promise<void>;
