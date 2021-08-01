import React from 'react'
import './Profile.scss'
import AddressBar, { ETH_ADDR_REGEX } from './AddressBar'
import { EmptyPage, ErrorPage } from './Placeholder'
import { ReactComponent as WalletLogo } from '../resources/wallet.svg'
import {UserLiquityInfo} from './UserLiquityInfo'
import UserAssetsInfo from './UserAssetsInfo'
import { log } from '../utils/DebugUtils';
import profileManager from './ProfileManager'

class Profile extends React.Component {

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

  renderProfile() {
    return (
      <div className="defi-info">
        <div className="defi-title">
          <WalletLogo className="defi-title-logo" />
          <span className="defi-title-text">Wallet</span>
          <a className="defi-title-tag"
            href={`https://etherscan.io/address/${this.state.address.address}`}
            target="_blank" rel="noreferrer">All</a>
        </div>
        <UserAssetsInfo address={this.state.address.address} />
        <UserLiquityInfo address={this.state.address.address} />
      </div>
    )
  }

  renderContent() {
    log('profile render address', this.state.address)
    if (!this.state.address || !this.state.address.address) {
      return <EmptyPage />
    } else if (!this.state.address.address.match(ETH_ADDR_REGEX)) {
      return <ErrorPage />
    } else {
      return this.renderProfile()
    }
  }

  render() {
    return (
      <div className="profile">
        <AddressBar />
        {this.renderContent()}
      </div>
    )
  }
}

export default Profile
