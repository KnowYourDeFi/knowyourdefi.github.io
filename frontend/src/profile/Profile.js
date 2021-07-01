import React from 'react'
import PropTypes from 'prop-types'
import './Profile.scss'
import AddressBar, { ETH_ADDR_REGEX } from './AddressBar'
import { EmptyPage, ErrorPage } from './Placeholder'
import { ReactComponent as WalletLogo } from '../resources/wallet.svg'
import {UserLiquityInfo} from './UserLiquityInfo'
import UserAssetsInfo from './UserAssetsInfo'

class Profile extends React.Component {

  state = {
    address: null,
  }

  constructor(props) {
    super(props)
    this.addressbar = React.createRef()

    this.onCurrentAddressChange = this.onCurrentAddressChange.bind(this)
  }

  getAddress() {
    return this.addressbar.current?.getAddress()
  }

  onCurrentAddressChange(address) {
    this.setState({ address })
    this.props.onCurrentAddressChange(address)
  }

  renderProfile() {
    return (
      <div className="defi-info">
        <div className="defi-title">
          <WalletLogo className="defi-title-logo" />
          <span className="defi-title-text">Wallet</span>
          <a className="defi-title-tag"
            href={`https://etherscan.io/address/${this.state.address}`}
            target="_blank" rel="noreferrer">All</a>
        </div>
        <UserAssetsInfo address={this.state.address} />
        <UserLiquityInfo address={this.state.address} />
      </div>
    )
  }

  renderContent() {
    if (!this.state.address) {
      return <EmptyPage />
    } else if (!this.state.address.match(ETH_ADDR_REGEX)) {
      return <ErrorPage />
    } else {
      return this.renderProfile()
    }
  }

  render() {
    return (
      <div className="profile">
        <AddressBar ref={this.addressbar} onCurrentAddressChange={this.onCurrentAddressChange} />
        {this.renderContent()}
      </div>
    )
  }
}

Profile.propTypes = {
  onCurrentAddressChange: PropTypes.func,
}

Profile.defaultProps = {
  onCurrentAddressChange: function (address) { console.log('current address change', address) },
}

export default Profile
