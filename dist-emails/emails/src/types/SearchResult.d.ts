import { ValidDate } from 'shared/validObjects/ValidDate';
import { ValidDateTime } from 'shared/validObjects/ValidDateTime';
import { ValidFlightType } from 'shared/validObjects/ValidFlightType';
import { ValidLocationCodeList } from 'shared/validObjects/ValidLocationCodeList';
import { ValidPrice } from 'shared/validObjects/ValidPrice';
export interface SearchResult {
    readonly price?: ValidPrice;
    readonly created: ValidDateTime;
    readonly origin: ValidLocationCodeList;
    readonly destination: ValidLocationCodeList;
    readonly departure: ValidDate;
    readonly arrival?: ValidDate;
    readonly flightType: ValidFlightType;
}
