import React from 'react'
import PropTypes from 'prop-types'
import './Profile.scss'
import AddressBar, { ETH_ADDR_REGEX } from './AddressBar'
import { EmptyPage, ErrorPage } from './Placeholder'
import { ReactComponent as WalletLogo } from '../resources/wallet.svg'
import UserLiquityInfo from './UserLiquityInfo'

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

  walletEthTable() {
    return <table className="table">
      <thead>
        <tr>
          <th>Asset</th>
          <th>Balance</th>
          <th>Value(USD)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>ETH</th>
          <td>292.76 ETH</td>
          <td>$39,436</td>
        </tr>
        <tr>
          <th>LQTY</th>
          <td>29,892 LQTY</td>
          <td>$39,436</td>
        </tr>
      </tbody>
    </table>
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
        <div className="defi-card">
          <div className="defi-card-large-title">
            Ethereum
          </div>
          {this.walletEthTable()}
        </div>
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
