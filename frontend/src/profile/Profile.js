import React from 'react'
import PropTypes from 'prop-types'
import './Profile.scss'
import AddressBar from './AddressBar'
import { EmptyPage, ErrorPage } from './Placeholder'

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

  renderContent() {
    if (!this.state.address) {
      return <EmptyPage />
    } else {
      return this.state.address
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
