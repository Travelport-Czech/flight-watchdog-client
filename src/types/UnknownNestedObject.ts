export interface UnknownNestedObject {
  readonly [key: string]: UnknownNestedObject | UnknownNestedObject[] | string | number | boolean | undefined
}
