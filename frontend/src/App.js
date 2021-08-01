import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import './App.scss'
import { ReactComponent as RabbitLogo } from './resources/rabbithole.svg'
import { ReactComponent as DaoLogo } from './resources/rhizome-dao.svg'
import { ReactComponent as GitHubLogo } from './resources/github.svg'
import { ReactComponent as MediumLogo } from './resources/medium.svg'
import { ReactComponent as TwitterLogo } from './resources/twitter.svg'
import { ReactComponent as HoprIcon } from './resources/hopr_icon.svg'
import { ReactComponent as LiquityIcon } from './resources/liquity.svg'
import LiquityInfo from './liquity/LiquityInfo'
import Profile from './profile/Profile'
import Rabbit from './rabbit/Rabbit'
import ConnectButton from './widget/ConnectButton'
import { log } from './utils/DebugUtils';
import HoprInfo from './hopr/HoprInfo'
import profileManager from './profile/ProfileManager'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      address: profileManager.getCurrentAddress()  // {address, ens}
    }

    this.onAddressChanged = this.onAddressChanged.bind(this)
  }

  componentDidMount() {
    profileManager.addAddressChangeListener(this.onAddressChanged)
  }

  componentWillUnmount() {
    profileManager.removeAddressChangeListener(this.onAddressChanged)
  }

  onAddressChanged(address) {
    this.setState({ address })
  }

  render() {
    log('app render')
    return (
      <BrowserRouter>
        <div className="app">
          <header className="app-header">
            <span className="app-header-container left">
              <Link to="/rabbit-hole"><RabbitLogo className="icon icon-monochrome" /></Link>
              <Link to="/liquity"><LiquityIcon className="icon" /></Link>
              <Link to="/hopr"><HoprIcon className="icon" /></Link>
            </span>
            <Link to="/"><DaoLogo className="logo" /></Link>
            <span className="app-header-container right">
              <a className="icon-container" href="https://github.com/KnowYourDeFi/knowyourdefi.github.io" target="_blank" rel="noreferrer"><GitHubLogo className="icon icon-monochrome" /></a>
              <a className="icon-container" href="https://medium.com/@KnowYourDeFi" target="_blank" rel="noreferrer"><MediumLogo className="icon icon-monochrome" /></a>
              <a className="icon-container" href="https://twitter.com/rhizomedao" target="_blank" rel="noreferrer"><TwitterLogo className="icon icon-monochrome" /></a>
              <Link to="/profile"><ConnectButton className="profile-button" text={this.state.address ? 'Profile' : 'Connect'} /></Link>
            </span>
          </header>

          <div className="app-body">
            <Switch className="switch-app">
              <Route path="/" children={(a) => {
                const path = a?.location?.pathname || '/'
                return (
                  <>
                    <div className="app-page" style={{ display: path === '/profile' ? 'block' : 'none' }} >
                      <Profile />
                    </div>

                    <div className="app-page" style={{ display: path === '/rabbit-hole' ? 'block' : 'none' }}>
                      <Rabbit />
                    </div>

                    <div className="app-page" style={{ display: path === '/hopr' ? 'block' : 'none' }}>
                      <HoprInfo />
                    </div>

                    <div className="app-page" style={{ display: (path === '/liquity' || path === '/') ? 'block' : 'none' }}>
                      <LiquityInfo />
                    </div>
                  </>
                )
              }}>
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
