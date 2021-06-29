import React from 'react'
import PropTypes from 'prop-types'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import DropDownWithDelete from '../widget/DropDownWithDelete'
import { ReactComponent as MetaMaskLogo } from '../resources/metamask.svg'
import './AddressBar.scss'

const ETH_ADDR_REGEX = /^0x[a-fA-F0-9]{40}$/

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
    this.onMetaMaskClick = this.onMetaMaskClick.bind(this)
    this.onAddressSubmit = this.onAddressSubmit.bind(this)
    this.onCurrentAddressChange = this.onCurrentAddressChange.bind(this)
    this.onAddressListChange = this.onAddressListChange.bind(this)

    this.handleMetaMaskAccounts = this.handleMetaMaskAccounts.bind(this)
  }

  componentDidMount() {
    // trigger the listener to handle the initial data from cookie
    if (this.dropdown.current) {
      this.props.onAddressListChange(this.dropdown.current.getOptions())
      this.props.onCurrentAddressChange(this.dropdown.current.getValue())
    }
  }

  componentWillUnmount() {
    window.ethereum?.removeListener('accountsChanged', this.handleMetaMaskAccounts)
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
    if (!address || !address.match(ETH_ADDR_REGEX)) {
      return false
    }
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

  async onMetaMaskClick(event) {
    event.preventDefault();
    console.log('onMetaMaskClick', window.ethereum)
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', this.handleMetaMaskAccounts)
      window.ethereum.on('accountsChanged', this.handleMetaMaskAccounts);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        this.handleMetaMaskAccounts(accounts)
      } catch (e) {
        console.error(e)
      }
    } else {
      console.error('Metamask not installed!')
    }
  }

  onAddressSubmit(event) {
    event.preventDefault()
    this.addAndSelectAddress(this.state.inputAddress)
  }

  handleMetaMaskAccounts(accounts) {
    if (accounts && accounts[0]) {
      this.addAndSelectAddress(accounts[0])
    } else {
      console.error('accounts[0] is undefined')
    }
  }

  addAndSelectAddress(address) {
    if (!address) return
    console.log('select address', address)
    address = address.toLowerCase()
    this.dropdown.current?.addAndSelectOption(address)
    // dismiss and reset add address popup
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
            <div className="add-address-text">Input</div>
            <div className="add-address-input">
              <input type="text" className="form-control" id="inputAddress" value={this.state.inputAddress} onChange={this.onInputChange} placeholder="Enter Ethereum Address"></input>
              <button type="submit" className="btn btn-primary mb-3" onClick={this.onAddressSubmit} disabled={!this.state.enableSubmit}>Add</button>
            </div>
            <div className="add-address-text">Or connect with</div>
            <MetaMaskLogo className="add-address-metamask" onClick={this.onMetaMaskClick} />
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
export { ETH_ADDR_REGEX }
