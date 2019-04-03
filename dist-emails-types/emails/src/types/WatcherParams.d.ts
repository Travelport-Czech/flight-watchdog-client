import { ValidDate } from 'shared/validObjects/ValidDate';
import { ValidDateTime } from 'shared/validObjects/ValidDateTime';
import { ValidEmail } from 'shared/validObjects/ValidEmail';
import { ValidFlightType } from 'shared/validObjects/ValidFlightType';
import { ValidLanguage } from 'shared/validObjects/ValidLanguage';
import { ValidLocationCodeList } from 'shared/validObjects/ValidLocationCodeList';
import { ValidPrice } from 'shared/validObjects/ValidPrice';
import { ValidWatcherId } from 'shared/validObjects/ValidWatcherId';
export interface WatcherParams {
    readonly id: ValidWatcherId;
    readonly email: ValidEmail;
    readonly origin: ValidLocationCodeList;
    readonly destination: ValidLocationCodeList;
    readonly departure: ValidDate;
    readonly arrival?: ValidDate;
    readonly priceLimit: ValidPrice;
    readonly lang: ValidLanguage;
    readonly created: ValidDateTime;
    readonly flightType: ValidFlightType;
}
