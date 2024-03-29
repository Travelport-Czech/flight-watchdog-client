import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { HeaderDates } from '@shared/reactComponents/HeaderDates'
import { LocationNameList } from '@shared/reactComponents/LocationNameList'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

interface Props {
    readonly watcherFullInfo: WatcherFullInfo
    readonly frontendUrl: string
    readonly lang: SupportedLanguageEnum
}

export class EmailLowerPriceHeader extends React.Component<Props> {
    public render() {
        const { watcherFullInfo, frontendUrl, lang } = this.props
        const { watcher, originLocationList, destinationLocationList } = watcherFullInfo
        const { departure, arrival } = watcher
        const destinationTextKey =
            watcher.flightType === 'return'
                ? TranslationEnum.ClientDestinationsReturn
                : TranslationEnum.ClientDestinationsOneway

        return (
            <div style={styles.header}>
                <div style={styles.headerText}>
                    <Text name={TranslationEnum.EmailTitle} lang={lang} />
                </div>
                <div style={styles.headerTextDescription}>
                    <Text name={TranslationEnum.EmailDescription} lang={lang}>
                        <a href={frontendUrl.toString()}>{frontendUrl.toString()}</a>
                    </Text>
                </div>

                <div style={styles.headerLevel2}>
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
        )
    }
}
