import React from 'react'
import PropTypes from 'prop-types'
import AddressBar from './AddressBar'
import './Profile.scss'

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.addressbar = React.createRef()

    this.onCurrentAddressChange = this.onCurrentAddressChange.bind(this)
  }

  getAddress() {
    return this.addressbar.current?.getAddress()
  }

  onCurrentAddressChange(address) {
    this.props.onCurrentAddressChange(address)
  }

  render() {
    return (
      <div className="profile">
        <AddressBar ref={this.addressbar} onCurrentAddressChange={this.onCurrentAddressChange} />
      </div>
    )
  }
}

Profile.propTypes = {
  onCurrentAddressChange: PropTypes.func,
}

Profile.defaultProps = {
  onCurrentAddressChange: function (address) { console.log('current address change', address ) },
}

export default Profile
