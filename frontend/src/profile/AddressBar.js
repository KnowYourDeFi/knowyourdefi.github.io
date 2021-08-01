import React from 'react'
import profileManager from './ProfileManager'
import DropDownWithDelete from '../widget/DropDownWithDelete'
import { ReactComponent as MetaMaskLogo } from '../resources/metamask.svg'
import './AddressBar.scss'
import { ensNameToAddress, addressToEnsName } from '../utils/EnsResolver';
import { log } from '../utils/DebugUtils';
import MetaMaskManager from '../utils/MetaMaskManager'

export const ETH_ADDR_REGEX = /^0x[a-fA-F0-9]{40}$/
export const ENS_NAME_REGEX = /^.{3,}\..{3,}$/i // xxx.xxx

class AddressBar extends React.Component {

  constructor(props) {
    super(props)

    this.options = profileManager.getAddressList() // [{ address, ens }, ...]
    this.current = profileManager.getCurrentAddress() // { address, ens }

    this.state = {
      showAddAddressPopup: false,
      inputValid: false,
      inputContent: '',
      loading: false,
    }

    this.metaMaskManager = new MetaMaskManager()
    this.dropdown = React.createRef()

    this.onAddClick = this.onAddClick.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onMetaMaskClick = this.onMetaMaskClick.bind(this)
    this.onAddressSubmit = this.onAddressSubmit.bind(this)
    this.onCurrentAddressChange = this.onCurrentAddressChange.bind(this)
    this.onAddressListChange = this.onAddressListChange.bind(this)
    this.selectAccount = this.selectAccount.bind(this)
  }

  componentDidMount() {
    this.metaMaskManager.addListener('account', this.selectAccount)
  }

  componentWillUnmount() {
    this.metaMaskManager.removeListener('account', this.selectAccount)
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

  async onMetaMaskClick(e) {
    e.preventDefault()
    try {
      await this.metaMaskManager.connect()
    } catch (e) {
      console.error('MetaMask connect error', e)
      this.showMessage(e.message)
    }
  }

  async onAddressSubmit(e) {
    e.preventDefault()
    await this.selectAccount(this.state.inputContent)
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
  async selectAccount(value) {
    if (!value) return
    value = value.toLowerCase()
    log('add and select address', value)

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
    log('addressbar current address change', currentAddress)
    this.current = currentAddress
    profileManager.setCurrentAddress(currentAddress)
  }

  onAddressListChange(addressList) {
    this.options = addressList
    profileManager.setAddressList(addressList)
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

export default AddressBar
