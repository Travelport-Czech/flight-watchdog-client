import { ValidDateTime, ValidPrice } from '@travelport-czech/valid-objects-ts'

export interface PriceHistoryRecord {
  readonly price: ValidPrice
  readonly created: ValidDateTime
}
