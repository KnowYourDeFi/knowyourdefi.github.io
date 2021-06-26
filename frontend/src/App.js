import React from 'react'
import './App.scss'
import './resources/bootstrap.css'
import { ReactComponent as RabbitLogo } from './resources/rabbithole.svg'
import { ReactComponent as LiquityLogo } from './resources/liquity.svg'
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
    address: null,
  }

  constructor(props) {
    super(props)

    this.profile = React.createRef()

    this.onCurrentAddressChange = this.onCurrentAddressChange.bind(this)
    this.onRabbitClick = this.onRabbitClick.bind(this)
    this.onLiquityClick = this.onLiquityClick.bind(this)
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

  onLiquityClick(e) {
    e.preventDefault()
    this.setState({
      page: PAGE.LIQUITY
    })
  }

  onGithubClick(e) {
    e.preventDefault()
    window.open('https://www.github.com', '_blank').focus()
  }

  onMediumClick(e) {
    e.preventDefault()
    window.open('https://www.medium.com', '_blank').focus()
  }

  onTwitterClick(e) {
    e.preventDefault()
    window.open('https://www.twitter.com', '_blank').focus()
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
          <LiquityLogo className="logo" onClick={this.onLiquityClick} />
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
