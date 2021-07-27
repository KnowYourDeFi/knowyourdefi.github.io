
import Cookies from 'js-cookie'
const JsonCookies = Cookies.withConverter({
  write: JSON.stringify,
  read: JSON.parse
});

class ProfileManager {

  constructor() {
    // initial value
    this.addressList = JsonCookies.get('addressList') || [] // [{ address, ens }, ...]
    this.currentAddress = JsonCookies.get('currentAddress') // { address, ens }
    // fix invalid data
    if (this.addressList.length === 0) {
      this.currentAddress = null
    }
  }

  getAddressList() {
    return this.addressList
  }

  getCurrentAddress() {
    return this.currentAddress
  }

  setAddressList(addressList) {
    JsonCookies.set('addressList', addressList)
  }

  setCurrentAddress(currentAddress) {
    if (currentAddress) {
      JsonCookies.set('currentAddress', currentAddress)
    } else {
      JsonCookies.remove('currentAddress')
    }
    this.currentAddressChangeListener && this.currentAddressChangeListener(currentAddress)
  }

  setCurrentAddressChangeListener(listener) {
    this.currentAddressChangeListener = listener
  }
}

const profileManager = new ProfileManager()

export default profileManager
