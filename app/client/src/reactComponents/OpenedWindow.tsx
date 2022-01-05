import { Consts } from '@client/Consts'
import { CrossButton } from '@client/reactComponents/CrossButton'
import { AppConfig } from '@client/types/AppConfig'
import { FlightParams } from '@client/types/FlightParams'
import { HeaderDates } from '@shared/reactComponents/HeaderDates'
import { LocationNameList } from '@shared/reactComponents/LocationNameList'
import { Price } from '@shared/reactComponents/Price'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'

interface Props {
    readonly flightParams: FlightParams
    readonly appConfig: AppConfig
    readonly id: string
    handleClose(event: React.MouseEvent<HTMLElement>): void
}

export class OpenedWindow extends React.Component<Props> {
    public render() {
        const { lowestPrice, lowestPriceCustomCurrency, lang } = this.props.appConfig
        const {
            destination,
            destinationLocationList,
            origin,
            originLocationList,
            flightType,
            departure,
            arrival,
        } = this.props.flightParams
        const destinationTextKey =
            flightType === 'return'
                ? TranslationEnum.ClientDestinationsReturn
                : TranslationEnum.ClientDestinationsOneway

        const price = <Price price={lowestPrice} lang={lang} />
        const priceWithDifferentCurrencies = (
            <React.Fragment>
                <Price price={lowestPrice} lang={lang} /> (
                <Price price={lowestPriceCustomCurrency} lang={lang} />)
            </React.Fragment>
        )

        return (
            <div
                className={`${Consts.elementClassPrefix}_window`}
                style={styles.chatBox}
                id={this.props.id}
                data-origin={origin.toString()}
                data-destination={destination.toString()}
                data-price={lowestPrice.amount.toString()}
                data-flighttype={flightType}
            >
                <div style={styles.header}>
                    <CrossButton onClick={this.props.handleClose} />
                    <div style={styles.headerText}>
                        <Text name={TranslationEnum.ClientTitle} lang={lang}>
                            {lowestPrice.currency === lowestPriceCustomCurrency.currency
                                ? price
                                : priceWithDifferentCurrencies}
                        </Text>
                    </div>
                    <div style={styles.headerTextDescription}>
                        <Text name={TranslationEnum.ClientDescription} lang={lang} />
                    </div>
                    <div style={styles.headerLevel2} className={`${Consts.elementClassPrefix}_destionations`}>
                        <Text name={destinationTextKey} lang={lang}>
                            <span style={styles.primaryColor}>
                                <LocationNameList locationList={originLocationList} />
                            </span>
                            <span style={styles.primaryColor}>
                                <LocationNameList locationList={destinationLocationList} />
                            </span>
                        </Text>
                    </div>
                    <div style={styles.headerDates}>
                        <HeaderDates departure={departure} arrival={arrival} lang={lang} />
                    </div>
                </div>
                <div className="content" style={styles.content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
