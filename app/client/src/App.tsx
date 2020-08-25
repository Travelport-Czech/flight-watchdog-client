import * as actions from '@client/actions'
import { Consts } from '@client/Consts'
import { isAllowedToAddWatcher } from '@client/functions'
import { Props } from '@client/Props'
import { ClosedWindow } from '@client/reactComponents/ClosedWindow'
import { ContinueWatchingPage } from '@client/reactComponents/pages/ContinueWatchingPage'
import { CreateFormPage } from '@client/reactComponents/pages/CreateFormPage'
import { CreateWatcherDonePage } from '@client/reactComponents/pages/CreateWatcherDonePage'
import { CreateWatcherWorkingPage } from '@client/reactComponents/pages/CreateWatcherWorkingPage'
import { ErrorPage } from '@client/reactComponents/pages/ErrorPage'
import { RemoveMoreWatchersPage } from '@client/reactComponents/pages/RemoveMoreWatchersPage'
import { RemoveWatcherPage } from '@client/reactComponents/pages/RemoveWatcherPage'
import { RemoveWatcherWorkingPage } from '@client/reactComponents/pages/RemoveWatcherWorkingPage'
import { State } from '@client/State'
import { StepToShow } from '@client/StepsToShow'
import { FlightParams } from '@client/types/FlightParams'
import { validateEmail } from '@shared/utils/validateEmail'
import * as Cookies from 'js-cookie'
import * as React from 'react'

export class App extends React.Component<Props, State> {
  public readonly state: Readonly<State> = {
    destinationLocationList: [],
    email: '',
    originLocationList: [],
    showBadEmailError: false,
    stepToShow: StepToShow.none,
  }

  public readonly componentDidMount = async () => {
    await this.init(this.props)
  }

  public readonly componentWillReceiveProps = async (nextProps: Readonly<Props>) => {
    await this.init(nextProps)
  }

  public render() {
    const flightParams = this.createFlightParams()
    const { lang } = this.props.appConfig
    if (!flightParams) {
      return ''
    }

    if (this.state.stepToShow === StepToShow.continueWatching) {
      return this.renderContinueWatching(flightParams)
    }

    if (this.state.stepToShow === StepToShow.createWatcherAgree) {
      return this.renderCreateWatcherAgree(flightParams)
    }

    if (this.state.stepToShow === StepToShow.createWatcherWorking) {
      return this.renderCreateWatcherWorking(flightParams)
    }

    if (this.state.stepToShow === StepToShow.removeWatcherWorking) {
      return this.renderRemoveWatcherWorking(flightParams)
    }

    if (this.state.stepToShow === StepToShow.createWatcherDone) {
      return this.renderCreateWatcherDone(flightParams)
    }

    if (this.state.stepToShow === StepToShow.error) {
      return <ErrorPage flightParams={flightParams} appConfig={this.props.appConfig} onClose={this.handleClose} />
    }

    if (this.state.stepToShow === StepToShow.removeWatcher) {
      return this.renderRemoveWatcher(flightParams)
    }

    if (this.state.stepToShow === StepToShow.removeMoreWatchers) {
      return this.renderRemoveMoreWatchers(flightParams)
    }

    if (this.state.stepToShow === StepToShow.minimalized) {
      return <ClosedWindow handleOpen={this.handleOpen} lang={lang} />
    }

    return ''
  }

  private readonly init = async (props: Readonly<Props>) => {
    const state = await actions.initialize(props, this.state)
    if (state) {
      this.setState(state)
    }
  }

  private readonly handleClose = async () => {
    const { token, apiUrl } = this.props.clientSettings
    const canCreateWatcher = await isAllowedToAddWatcher(token, apiUrl)
    if (!canCreateWatcher) {
      this.setState({ stepToShow: StepToShow.none })

      return
    }

    const keepMinimalisedInDays = this.props.clientSettings.keepMinimalisedInDays.value
    if (keepMinimalisedInDays !== 0) {
      Cookies.set(Consts.cookieName, 'true', { expires: keepMinimalisedInDays })
    }
    this.setState({ stepToShow: StepToShow.minimalized })
  }

  private readonly handleOpen = () => {
    this.setState({ stepToShow: StepToShow.createWatcherAgree })
  }

  private readonly handleCreateWatcher = async () => {
    const isEmailValid = validateEmail(this.state.email)
    if (!isEmailValid) {
      this.setState({ showBadEmailError: true })

      return
    }
    this.setState({ stepToShow: StepToShow.createWatcherWorking, showBadEmailError: false })
    this.setState(await actions.createWatcher(this.props, this.state))
  }

  private readonly handleDeleteAndCreateWatcher = async () => {
    this.setState({ stepToShow: StepToShow.createWatcherWorking })
    const deleteIsSuccessful = await actions.deleteWatcher(this.props, this.state)
    if (!deleteIsSuccessful) {
      this.props.handleError(new Error('API delete watcher error.'), { props: this.props, state: this.state })
      this.setState({ stepToShow: StepToShow.error })
    }
    this.setState(await actions.createWatcher(this.props, this.state))
  }

  private readonly handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value })
  }

  private readonly createFlightParams = (): FlightParams | undefined => {
    const { departure, arrival, origin, destination, flightType } = this.props.appConfig

    return {
      arrival,
      departure,
      destination,
      destinationLocationList: this.state.destinationLocationList,
      origin,
      originLocationList: this.state.originLocationList,
      flightType,
    }
  }

  private readonly renderCreateWatcherDone = (flightParams: FlightParams): JSX.Element => {
    return (
      <CreateWatcherDonePage flightParams={flightParams} appConfig={this.props.appConfig} onClose={this.handleClose} />
    )
  }

  private readonly renderRemoveWatcherWorking = (flightParams: FlightParams): JSX.Element => {
    return (
      <RemoveWatcherWorkingPage
        flightParams={flightParams}
        appConfig={this.props.appConfig}
        onClose={this.handleClose}
      />
    )
  }

  private readonly renderCreateWatcherWorking = (flightParams: FlightParams): JSX.Element => {
    return (
      <CreateWatcherWorkingPage
        flightParams={flightParams}
        appConfig={this.props.appConfig}
        onClose={this.handleClose}
      />
    )
  }

  private readonly renderContinueWatching = (flightParams: FlightParams): JSX.Element => {
    return (
      <ContinueWatchingPage
        flightParams={flightParams}
        appConfig={this.props.appConfig}
        onClose={this.handleClose}
        onCreateWatcher={this.handleCreateWatcher}
      />
    )
  }

  private readonly renderRemoveWatcher = (flightParams: FlightParams): JSX.Element => {
    return (
      <RemoveWatcherPage
        flightParams={flightParams}
        appConfig={this.props.appConfig}
        onClose={this.handleClose}
        onDeleteAndCreateWatcher={this.handleDeleteAndCreateWatcher}
      />
    )
  }

  private readonly renderRemoveMoreWatchers = (flightParams: FlightParams): JSX.Element => {
    return (
      <RemoveMoreWatchersPage flightParams={flightParams} appConfig={this.props.appConfig} onClose={this.handleClose} />
    )
  }

  private readonly renderCreateWatcherAgree = (flightParams: FlightParams): JSX.Element => {
    const { email, showBadEmailError } = this.state

    return (
      <CreateFormPage
        email={email}
        showBadEmailError={showBadEmailError}
        flightParams={flightParams}
        appConfig={this.props.appConfig}
        onClose={this.handleClose}
        onCreateWatcher={this.handleCreateWatcher}
        onEmailChange={this.handleEmailChange}
      />
    )
  }
}
