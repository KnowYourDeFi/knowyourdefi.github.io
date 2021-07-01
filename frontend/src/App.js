import React from 'react'
import './App.scss'
// import 'react-bootstrap'
// import './resources/bootstrap.css'
import { ReactComponent as RabbitLogo } from './resources/rabbithole.svg'
import { ReactComponent as DaoLogo } from './resources/rhizome-dao.svg'
import { ReactComponent as GitHubLogo } from './resources/github.svg'
import { ReactComponent as MediumLogo } from './resources/medium.svg'
import { ReactComponent as TwitterLogo } from './resources/twitter.svg'
import LiquityInfo from './liquity/LiquityInfo'
import Profile from './profile/Profile'
import Rabbit from './rabbit/Rabbit'
import ConnectButton from './widget/ConnectButton'

const PAGE = Object.freeze({ 'LIQUITY': 1, 'PROFILE': 2, 'RABBIT': 3 })

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
    this.onGithubClick = this.onGithubClick.bind(this)
    this.onMediumClick = this.onMediumClick.bind(this)
    this.onTwitterClick = this.onTwitterClick.bind(this)
    this.onProfileClick = this.onProfileClick.bind(this)
  }

  onCurrentAddressChange(address) {
    console.log('app current address change', address)
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

  onGithubClick(e) {
    e.preventDefault()
    window.open('https://github.com/KnowYourDeFi/knowyourdefi.github.io', '_blank').focus()
  }

  onMediumClick(e) {
    e.preventDefault()
    window.open('https://medium.com/@KnowYourDeFi', '_blank').focus()
  }

  onTwitterClick(e) {
    e.preventDefault()
    window.open('https://twitter.com/rhizomedao', '_blank').focus()
  }

  onProfileClick(e) {
    e.preventDefault()
    this.setState({
      page: PAGE.PROFILE
    })
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <span className="app-header-container left">
            <RabbitLogo className="icon icon-monochrome" onClick={this.onRabbitClick} />
          </span>
          <DaoLogo className="logo" onClick={this.onDaoClick} />
          <span className="app-header-container right">
            <GitHubLogo className="icon icon-monochrome" onClick={this.onGithubClick} />
            <MediumLogo className="icon icon-monochrome" onClick={this.onMediumClick} />
            <TwitterLogo className="icon icon-monochrome" onClick={this.onTwitterClick} />
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
          <div className="app-page" style={{ display: this.state.page === PAGE.PROFILE ? 'block' : 'none' }}>
            <Profile ref={this.profile} onCurrentAddressChange={this.onCurrentAddressChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
