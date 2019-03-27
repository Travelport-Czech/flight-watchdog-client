export interface WatcherClientCreateParams {
  readonly email: string
  readonly priceLimit: string
  readonly lang: string
  readonly arrival?: string
  readonly departure: string
  readonly destination: string
  readonly origin: string
}
