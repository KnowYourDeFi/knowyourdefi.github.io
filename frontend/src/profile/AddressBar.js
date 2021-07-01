import React from 'react'
import PropTypes from 'prop-types'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import DropDownWithDelete from '../widget/DropDownWithDelete'
import { ReactComponent as MetaMaskLogo } from '../resources/metamask.svg'
import './AddressBar.scss'
import { ensNameToAddress, addressToEnsName } from '../utils/EnsResolver';

const ETH_ADDR_REGEX = /^0x[a-fA-F0-9]{40}$/
const ENS_NAME_REGEX = /^.{3,}\..{3,}$/i // xxx.xxx

class AddressBar extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props)

    // initial value
    this.options = this.props.cookies.get('addressList') // [{ address, ens }, ...]
    this.current = this.props.cookies.get('currentAddress') // { address, ens }
    // fix invalid data
    if (!this.options || this.options.length === 0) {
      this.current = null
    }

    this.state = {
      showAddAddressPopup: false,
      inputValid: false,
      inputContent: '',
      loading: false,
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
      this.props.onCurrentAddressChange(this.dropdown.current.getCurrent())
    }
  }

  componentWillUnmount() {
    window.ethereum?.removeListener('accountsChanged', this.handleMetaMaskAccounts)
  }

  getAddress() {
    return this.dropdown.current?.getCurrent()
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
    return address && (address.match(ETH_ADDR_REGEX) || address.match(ENS_NAME_REGEX))
  }

  onInputChange(event) {
    event.preventDefault()
    const value = event.target.value || ''
    const valid = this.isAddressValid(value)
    this.setState({
      inputContent: value,
      inputValid: valid,
    })
  }

  showMessage(message) {
    window.alert(message)
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
        console.error('MetaMask read account failed', e)
        this.showMessage('MetaMask read account failed')
      }
    } else {
      console.error('MetaMask not installed')
      this.showMessage('MetaMask not installed')
    }
  }

  onAddressSubmit(event) {
    event.preventDefault()
    this.addAndSelectAddress(this.state.inputContent)
  }

  handleMetaMaskAccounts(accounts) {
    if (accounts && accounts[0]) {
      this.addAndSelectAddress(accounts[0])
    } else {
      console.error('MetaMask read account failed, accounts[0] is undefined')
      this.showMessage('MetaMask read account failed')
    }
  }

  isDuplicated(option) {
    const duplicate = option && this.options?.find(o => {
      return (option.address && (o.address === option.address)) || (option.ens && (o.ens === option.ens))
    })
    return duplicate ? true : false
  }

  /**
   * Add and select address. The value may already exists.
   * @param {string} value eth address or ens name
   */
  async addAndSelectAddress(value) {
    if (!value) return
    value = value.toLowerCase()
    console.log('add and select address', value)

    try {
      this.setState({
        loading: true,
      })

      let option, address, ens, error
      if (value.match(ETH_ADDR_REGEX)) {

        // ens may be null
        address = value
        ens = await addressToEnsName(address)
        option = { address: value, ens }

      } else if (value.match(ENS_NAME_REGEX)) {

        // address must exists
        ens = value
        address = await ensNameToAddress(ens)
        if (address) {
          option = { address, ens: value }
        } else {
          error = `resolve ethereum address from '${ens}' failed`
        }

      } else {
        error = `input value '${value}' is illegal`
      }

      if (option) {
        // load success
        this.dropdown.current?.addAndSelectOption(option)
        // dismiss and reset add address popup
        this.setState({
          showAddAddressPopup: false,
          inputValid: false,
          inputContent: '',
          loading: false,
        })
      } else {
        console.error(error)
        this.setState({
          loading: false,
        })
        this.showMessage(error)
      }
    } catch (e) {
      console.error(e)
      this.setState({
        loading: false
      })
      this.showMessage(`resolve address '${value}' failed`)
    }
  }

  onCurrentAddressChange(currentAddress) {
    this.current = currentAddress
    if (currentAddress) {
      this.props.cookies.set('currentAddress', currentAddress)
    } else {
      this.props.cookies.remove('currentAddress')
    }
    this.props.onCurrentAddressChange(currentAddress)
  }

  onAddressListChange(addressList) {
    this.options = addressList
    this.props.cookies.set('addressList', addressList)
    this.props.onAddressListChange(addressList)
  }

  formatOption(option) {
    let s = ''
    if (option) {
      s += option.address
      if (option.ens) {
        s += ' (' + option.ens + ')'
      }
    }
    return s
  }

  compareOptions(o1, o2) {
    return o1 && o2 && o1.address === o2.address
  }

  renderAddAddressPopup() {
    if (this.state.showAddAddressPopup) {
      return (
        <div className="add-address">
          <div className="add-address-panel">
            <div className="add-address-close" onClick={this.onCloseClick}>&nbsp;x&nbsp;</div>
            <div className="add-address-title">Add Address</div>
            <div className="add-address-text">Input</div>
            <div className="add-address-form">
              <input type="text" className="add-address-input" value={this.state.inputContent} onChange={this.onInputChange} placeholder="Enter ENS name or Ethereum address"></input>
              <button type="submit" className="add-address-button" onClick={this.onAddressSubmit} disabled={!this.state.inputValid || this.state.loading}>{this.state.loading ? 'Loading' : 'Go'}</button>
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
            placeholder={'Add and select Ethereum address...'}
            options={this.options || []}
            current={this.current}
            formatter={this.formatOption}
            comparator={this.compareOptions}
            onOptionsChange={this.onAddressListChange}
            onCurrentChange={this.onCurrentAddressChange}
          />
          <div className="address-add-button" onClick={this.onAddClick}>+</div>
        </div>
        {this.renderAddAddressPopup()}
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
export { ETH_ADDR_REGEX, ENS_NAME_REGEX as ENS_ADDR_REGEX }
