import React from 'react'
import PropTypes from 'prop-types'
import './Profile.scss'
import AddressBar, { ETH_ADDR_REGEX } from './AddressBar'
import { EmptyPage, ErrorPage } from './Placeholder'
import { ReactComponent as WalletLogo } from '../resources/wallet.svg'
import { ReactComponent as LiquityLogo } from '../resources/liquity.svg'
import ColorProgressBar from '../widget/ColorProgressBar'

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

  liquityStakingTable() {
    return <table className="table">
      <thead>
        <tr>
          <th>Staked</th>
          <th>Balance</th>
          <th>APR</th>
          <th>Value(USD)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>LQTY</th>
          <td>292.76</td>
          <td>20%</td>
          <td>$39,436</td>
        </tr>
        <tr>
          <th>LUSD</th>
          <td>292.76</td>
          <td>20%</td>
          <td>$39,436</td>
        </tr>
      </tbody>
    </table>
  }

  liquityTroveBorrowTable() {
    return <table className="table">
      <thead>
        <tr>
          <th>Borrow</th>
          <th>Balance</th>
          <th>Value(USD)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>LUSD</th>
          <td>292.76 LUSD</td>
          <td>$39,436</td>
        </tr>
      </tbody>
    </table>
  }

  liquityTroveSuppliedTable() {
    return <table className="table">
      <thead>
        <tr>
          <th>Supplied</th>
          <th>Balance</th>
          <th>Value(USD)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>ETH</th>
          <td>29.00 ETH</td>
          <td>$39,436</td>
        </tr>
      </tbody>
    </table>
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
        <div class="defi-card">
          <div class="defi-card-large-title">
            Ethereum
          </div>
          {this.walletEthTable()}
        </div>

        <div className="defi-title">
          <LiquityLogo className="defi-title-logo" />
          <span className="defi-title-text">Liquity</span>
        </div>
        <div className="defi-card">
          <div className="defi-card-large-title">
            Trove
          </div>
          {this.liquityTroveSuppliedTable()}
          {this.liquityTroveBorrowTable()}
        </div>
        <div className="defi-card">
          <div className="defi-card-large-title">
            Risk Alert
          </div>
          <ColorProgressBar
            progress={80}
            descriptions={['Killed', 'High Risk', 'Master', 'Healthy']}
          />
          <div style={{ textAlign: 'center' }}>
            TextTextTextTextTextTextTextTextTextTextTextTextText<br />
            TextTextTextTextTextTextTextTextTextTextTextTextText<br />
            TextTextTextTextTextTextTextTextTextTextTextTextText<br />
            TextTextTextTextTextTextTextTextTextTextTextTextText
          </div>
        </div>
        <div className="defi-card">
          <div className="defi-card-large-title">
            Staking
          </div>
          {this.liquityStakingTable()}
        </div>
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
