import React from 'react'
import './App.scss'
import { ReactComponent as RabbitLogo } from './resources/rabbithole.svg'
import { ReactComponent as DaoLogo } from './resources/rhizome-dao.svg'
import { ReactComponent as GitHubLogo } from './resources/github.svg'
import { ReactComponent as MediumLogo } from './resources/medium.svg'
import { ReactComponent as TwitterLogo } from './resources/twitter.svg'
import { ReactComponent as KeanuLogo } from './resources/keep.svg'
import { ReactComponent as HoprIcon } from './resources/hopr_icon.svg'
import { ReactComponent as LiquityIcon } from './resources/liquity.svg'
import LiquityInfo from './liquity/LiquityInfo'
import Profile from './profile/Profile'
import Rabbit from './rabbit/Rabbit'
import ConnectButton from './widget/ConnectButton'
import { log } from './utils/DebugUtils';
import KeanuInfo from './keanu/KeanuInfo'
import HoprInfo from './hopr/HoprInfo'

const PAGE = Object.freeze({ 'LIQUITY': 1, 'PROFILE': 2, 'RABBIT': 3, 'HOPR': 4, 'KEANU': 5 })

class App extends React.Component {

  state = {
    page: PAGE.LIQUITY,
    address: null, // {address, ens}
  }

  constructor(props) {
    super(props)

    this.profile = React.createRef()

    this.onCurrentAddressChange = this.onCurrentAddressChange.bind(this)
    this.onRabbitClick = this.onRabbitClick.bind(this)
    this.onDaoClick = this.onDaoClick.bind(this)
    this.onProfileClick = this.onProfileClick.bind(this)
    this.onKeanuClick = this.onKeanuClick.bind(this)
    this.onLiquityClick = this.onLiquityClick.bind(this)
    this.onHoprClick = this.onHoprClick.bind(this)
  }

  onCurrentAddressChange(address) {
    log('app current address change', address)
    this.setState({
      address: address
    })
  }

  onRabbitClick(e) {
    e.preventDefault()
    this.setState({
      page: PAGE.RABBIT
    })
  }

  onDaoClick(e) {
    e.preventDefault()
    this.setState({
      page: PAGE.LIQUITY
    })
  }

  onProfileClick(e) {
    e.preventDefault()
    this.setState({
      page: PAGE.PROFILE
    })
  }

  onKeanuClick(e) {
    e.preventDefault()
    this.setState({
      page: PAGE.KEANU
    })
  }
  
  onLiquityClick(e) {
    e.preventDefault()
    this.setState({
      page: PAGE.LIQUITY
    })
  }

  onHoprClick(e){
    e.preventDefault()
    this.setState({
      page: PAGE.HOPR
    })
  }

  render() {
    log('app render')
    return (
      <div className="app">
        <header className="app-header">
          <span className="app-header-container left">
            <RabbitLogo className="icon icon-monochrome" onClick={this.onRabbitClick} />
            <HoprIcon className="icon" onClick={this.onHoprClick} />
            <LiquityIcon className="icon" onClick={this.onLiquityClick} />
            <KeanuLogo className="logo" onClick={this.onKeanuClick} />
          </span>
          <DaoLogo className="logo" onClick={this.onDaoClick} />
          <span className="app-header-container right">
            <a className="icon-container" href="https://github.com/KnowYourDeFi/knowyourdefi.github.io" target="_blank" rel="noreferrer"><GitHubLogo className="icon icon-monochrome" /></a>
            <a className="icon-container" href="https://medium.com/@KnowYourDeFi" target="_blank" rel="noreferrer"><MediumLogo className="icon icon-monochrome" /></a>
            <a className="icon-container" href="https://twitter.com/rhizomedao" target="_blank" rel="noreferrer"><TwitterLogo className="icon icon-monochrome" /></a>
            <ConnectButton className="profile-button" text={this.state.address ? 'Profile' : 'Connect'} onClick={this.onProfileClick} />
          </span>
        </header>

        <div className="app-body">
          {/* use display instead of remove the invisible page to avoid page internal state loss */}
          <div className="app-page" style={{ display: this.state.page === PAGE.RABBIT ? 'block' : 'none' }}>
            <Rabbit />
          </div>
          <div className="app-page" style={{ display: this.state.page === PAGE.LIQUITY ? 'block' : 'none' }}>
            <LiquityInfo />
          </div>
          <div className="app-page" style={{ display: this.state.page === PAGE.KEANU ? 'block' : 'none' }}>
            <KeanuInfo />
          </div>
          <div className="app-page" style={{ display: this.state.page === PAGE.HOPR ? 'block' : 'none' }}>
            <HoprInfo />
          </div>
          <div className="app-page" style={{ display: this.state.page === PAGE.PROFILE ? 'block' : 'none' }}>
            <Profile ref={this.profile} onCurrentAddressChange={this.onCurrentAddressChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
