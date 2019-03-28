import * as Cookies from 'js-cookie'
import * as React from 'react'
import * as actions from 'src/client/actions'
import { Consts } from 'src/client/Consts'
import { Props } from 'src/client/Props'
import { ClosedWindow } from 'src/client/reactComponents/ClosedWindow'
import { ContinueWatchingPage } from 'src/client/reactComponents/pages/ContinueWatchingPage'
import { CreateFormPage } from 'src/client/reactComponents/pages/CreateFormPage'
import { CreateWatcherDonePage } from 'src/client/reactComponents/pages/CreateWatcherDonePage'
import { CreateWatcherWorkingPage } from 'src/client/reactComponents/pages/CreateWatcherWorkingPage'
import { ErrorPage } from 'src/client/reactComponents/pages/ErrorPage'
import { RemoveMoreWatchersPage } from 'src/client/reactComponents/pages/RemoveMoreWatchersPage'
import { RemoveWatcherByIdPage } from 'src/client/reactComponents/pages/RemoveWatcherByIdPage'
import { RemoveWatcherPage } from 'src/client/reactComponents/pages/RemoveWatcherPage'
import { RemoveWatcherWorkingPage } from 'src/client/reactComponents/pages/RemoveWatcherWorkingPage'
import { State } from 'src/client/State'
import { StepToShow } from 'src/client/StepsToShow'
import { FlightParams } from 'src/client/types/FlightParams'
import { validateEmail } from 'src/client/utils/validateEmail'
import { initializeTranslator } from 'src/shared/translation/Text'

export class App extends React.Component<Props, State> {
  public readonly state: Readonly<State> = {
    destinationLocationList: [],
    email: '',
    originLocationList: [],
    showBadEmailError: false,
    stepToShow: StepToShow.none
  }

  public readonly componentDidMount = async () => {
    await this.init(this.props)
  }

  public readonly componentWillReceiveProps = async (nextProps: Readonly<Props>) => {
    await this.init(nextProps)
  }

  public render() {
    const flightParams = this.createFlightParams()
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

    if (this.state.stepToShow === StepToShow.removeWatcherById) {
      return this.renderRemoveWatcherById(flightParams)
    }

    if (this.state.stepToShow === StepToShow.error) {
      return <ErrorPage flightParams={flightParams} price={this.props.price} onClose={this.handleClose} />
    }

    if (this.state.stepToShow === StepToShow.removeWatcher) {
      return (
        <RemoveWatcherPage
          flightParams={flightParams}
          price={this.props.price}
          onClose={this.handleClose}
          onDeleteAndCreateWatcher={this.handleDeleteAndCreateWatcher}
        />
      )
    }

    if (this.state.stepToShow === StepToShow.removeMoreWatchers) {
      return <RemoveMoreWatchersPage flightParams={flightParams} price={this.props.price} onClose={this.handleClose} />
    }

    if (this.state.stepToShow === StepToShow.minimalized) {
      return <ClosedWindow handleOpen={this.handleOpen} />
    }

    return ''
  }

  private readonly init = async (props: Readonly<Props>) => {
    initializeTranslator(props.lang)
    const state = await actions.initialize(props, this.state)
    if (state) {
      this.setState(state)
    }
  }

  private readonly handleClose = () => {
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
    const deleteIsSuccessful = await actions.deleteWatcherByEmail(this.props, this.state)
    if (!deleteIsSuccessful) {
      this.setState({ stepToShow: StepToShow.error })
    }
    this.setState(await actions.createWatcher(this.props, this.state))
  }

  private readonly handleDeleteById = async () => {
    this.setState({ stepToShow: StepToShow.removeWatcherWorking })
    const deleteIsSuccessful = await actions.deleteWatcherById(this.props)
    if (!deleteIsSuccessful) {
      this.setState({ stepToShow: StepToShow.error })

      return
    }
    this.setState({ stepToShow: StepToShow.createWatcherAgree })
  }

  private readonly handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value })
  }

  private readonly createFlightParams = (): FlightParams | undefined => {
    const { departure, arrival, origin, destination, flightType } = this.props.golUrlParams

    return {
      arrival,
      departure,
      destination,
      destinationLocationList: this.state.destinationLocationList,
      origin,
      originLocationList: this.state.originLocationList,
      flightType
    }
  }

  private readonly renderRemoveWatcherById = (flightParams: FlightParams): JSX.Element => {
    return (
      <RemoveWatcherByIdPage
        flightParams={flightParams}
        price={this.props.price}
        onClose={this.handleClose}
        onDelete={this.handleDeleteById}
      />
    )
  }

  private readonly renderCreateWatcherDone = (flightParams: FlightParams): JSX.Element => {
    return <CreateWatcherDonePage flightParams={flightParams} price={this.props.price} onClose={this.handleClose} />
  }

  private readonly renderRemoveWatcherWorking = (flightParams: FlightParams): JSX.Element => {
    return <RemoveWatcherWorkingPage flightParams={flightParams} price={this.props.price} onClose={this.handleClose} />
  }

  private readonly renderCreateWatcherWorking = (flightParams: FlightParams): JSX.Element => {
    return <CreateWatcherWorkingPage flightParams={flightParams} price={this.props.price} onClose={this.handleClose} />
  }

  private readonly renderContinueWatching = (flightParams: FlightParams): JSX.Element => {
    return (
      <ContinueWatchingPage
        flightParams={flightParams}
        price={this.props.price}
        onClose={this.handleClose}
        onCreateWatcher={this.handleCreateWatcher}
      />
    )
  }

  private readonly renderCreateWatcherAgree = (flightParams: FlightParams): JSX.Element => {
    const { email, showBadEmailError } = this.state

    return (
      <CreateFormPage
        email={email}
        showBadEmailError={showBadEmailError}
        flightParams={flightParams}
        price={this.props.price}
        onClose={this.handleClose}
        onCreateWatcher={this.handleCreateWatcher}
        onEmailChange={this.handleEmailChange}
      />
    )
  }
}
