import React from 'react'
import AddressBar from './AddressBar'
import './Profile.scss'

class Profile extends React.Component {

  onAddressSelected(address) {
    console.log('profile select address', address)
  }

  render() {
    return (
      <div className="profile">
        <AddressBar onAddressSelected={this.onAddressSelected} />
      </div>
    )
  }
}

export default Profile
