import React from 'react'
import PropTypes from 'prop-types'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import DropDownWithDelete from '../widget/DropDownWithDelete'
import './AddressBar.scss'

class AddressBar extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props)

    this.state = {
      showAddAddressPopup: false,
      enableSubmit: false,
      inputAddress: '',
    }

    this.dropdown = React.createRef()

    this.onAddClick = this.onAddClick.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onAddressSubmit = this.onAddressSubmit.bind(this)
    this.onCurrentAddressChange = this.onCurrentAddressChange.bind(this)
    this.onAddressListChange = this.onAddressListChange.bind(this)
  }

  componentDidMount() {
    // trigger the listener to handle the initial data from cookie
    if (this.dropdown.current) {
      this.props.onAddressListChange(this.dropdown.current.getOptions())
      this.props.onCurrentAddressChange(this.dropdown.current.getValue())
    }
  }

  getAddress() {
    return this.dropdown.current?.getValue()
  }

  onAddClick() {
    this.setState({
      showAddAddressPopup: true,
    })
  }

  onCloseClick() {
    this.setState({
      showAddAddressPopup: false,
    })
  }

  isAddressValid(address) {
    if (!address || !address.match(/^0x[a-fA-F0-9]{40}$/)) return false
    if (this.dropdown.current?.state.options?.indexOf(address) !== -1) {
      return false
    }
    return true
  }

  onInputChange(event) {
    event.preventDefault()
    const value = event.target.value || ''
    const valid = this.isAddressValid(value)
    this.setState({
      inputAddress: value,
      enableSubmit: valid,
    })
  }

  onAddressSubmit(event) {
    event.preventDefault()
    const newAddress = this.state.inputAddress
    this.dropdown.current?.addOption(newAddress)
    this.setState({
      showAddAddressPopup: false,
      enableSubmit: false,
      inputAddress: '',
    })
  }

  onCurrentAddressChange(currentAddress) {
    if (currentAddress) {
      this.props.cookies.set('currentAddress', currentAddress)
    } else {
      this.props.cookies.remove('currentAddress')
    }
    this.props.onCurrentAddressChange(currentAddress)
  }

  onAddressListChange(addressList) {
    this.props.cookies.set('addressList', addressList)
    this.props.onAddressListChange(addressList)
  }

  addAddressPopup() {
    if (this.state.showAddAddressPopup) {
      return (
        <div className="add-address">
          <div className="add-address-panel">
            <div className="add-address-close" onClick={this.onCloseClick}>&nbsp;x&nbsp;</div>
            <div className="add-address-title">Add Address</div>
            <div className="add-address-input">
              <input type="text" className="form-control" id="inputAddress" value={this.state.inputAddress} onChange={this.onInputChange} placeholder="Enter Ethereum Address"></input>
              <button type="submit" className="btn btn-primary mb-3" onClick={this.onAddressSubmit} disabled={!this.state.enableSubmit}>Add</button>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div className="address-bar">
        <div className="address-line">
          <DropDownWithDelete
            ref={this.dropdown}
            mClassName="address-dropdown"
            placeholder={'Select Ethereum address...'}
            options={this.props.cookies.get('addressList') || []}
            value={this.props.cookies.get('currentAddress')}
            onOptionsChange={this.onAddressListChange}
            onValueChange={this.onCurrentAddressChange}
          />
          <div className="address-add-button" onClick={this.onAddClick}>+</div>
        </div>
        {this.addAddressPopup()}
      </div>
    )
  }
}

AddressBar.propTypes = {
  onAddressListChange: PropTypes.func,
  onCurrentAddressChange: PropTypes.func,
}

AddressBar.defaultProps = {
  onAddressListChange: function (addressList) { console.log('address list change', addressList) },
  onCurrentAddressChange: function (address) { console.log('current address change', address) },
}

export default withCookies(AddressBar)
