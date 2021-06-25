import React from 'react'
import PropTypes from 'prop-types'
import DropDownWithDelete from '../widget/DropDownWithDelete'
import './AddressBar.scss'

class AddressBar extends React.Component {

  state = {
    showAddAddressPopup: false,
    enableSubmit: false,
    inputAddress: '',
  }

  dropdown = React.createRef()

  constructor(props) {
    super(props)

    this.onAddClick = this.onAddClick.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onAddressSubmit = this.onAddressSubmit.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
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

  onSelectChange(value) {
    this.props.onAddressSelected(value)
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
          <DropDownWithDelete ref={this.dropdown} mClassName="address-dropdown" placeholder={'Select Ethereum address...'} options={[]} value={null} onChange={this.onSelectChange} />
          <div className="address-add-button" onClick={this.onAddClick}>+</div>
        </div>
        {this.addAddressPopup()}
      </div>
    )
  }
}

AddressBar.propTypes = {
  onAddressSelected: PropTypes.func,
}

AddressBar.defaultProps = {
  onAddressSelected: function (address) { console.log(`address selected: ${address}`) },
}

export default AddressBar
