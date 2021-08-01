const events = require('events')

/**
 * General MetaMask manager, controll account related logic
 *
 * Usage:
 *
 * MetaMaskManager.connect()
 * MetaMaskManager.disconnect()
 * MetaMaskManager.isConnected()
 * MetaMaskManager.getAccount()
 *
 * class DemoComponent extends React.Component {
 *   constructor() {
 *     this.metaMaskManager = new MetaMaskManager()
 *   }
 *   componentDidMount() {
 *     this.metaMaskManager.addListener('account', this.handleAccount)
 *   }
 *   componentWillUnmount() {
 *     this.metaMaskManager.removeListener('account', this.handleAccount)
 *   }
 *   async onMetaMaskClick(e) {
 *     e.preventDefault()
 *     try {
 *       await this.metaMaskManager.connect()
 *     } catch (e) {
 *       console.error('MetaMask connect error', e)
 *       window.alert(e.message)
 *     }
 *   }
 * }
 */
export default class MetaMaskManager {

  constructor() {
    this.eventEmitter = new events.EventEmitter()
    this.handleMetaMaskAccounts = this.handleMetaMaskAccounts.bind(this)
  }

  async connect() {
    if (window.ethereum) {
      try {
        // remove previous listener if exists
        window.ethereum.removeListener('accountsChanged', this.handleMetaMaskAccounts)
        // request accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        this.handleMetaMaskAccounts(accounts)
        if (!this.account) {
          throw Error()
        }
        // add listener if connect success
        window.ethereum.on('accountsChanged', this.handleMetaMaskAccounts)
        this.eventEmitter.emit('connect', this.account)
        return this.account
      } catch (e) {
        console.error('MetaMask read account failed', e)
        throw Error('MetaMask read account failed')
      }
    } else {
      console.error('MetaMask is not installed')
      throw Error('MetaMask is not installed')
    }
  }

  disconnect() {
    this.account = null
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', this.handleMetaMaskAccounts)
    }
  }

  isConnected() {
    return Boolean(this.account)
  }

  getAccount() {
    return this.account
  }

  /**
   * event: 'connect', 'account'
   * listener: function(account) {}
   */
  addListener(event, listener) {
    this.eventEmitter.addListener(event, listener)
  }

  removeListener(event, listener) {
    this.eventEmitter.removeListener(event, listener)
  }

  // this method will be called when connect or switch account in MetaMask
  handleMetaMaskAccounts(accounts) {
    if (accounts && accounts[0]) {
      const newAccount = accounts[0]
      if (newAccount !== this.account) {
        this.account = newAccount
        this.eventEmitter.emit('account', newAccount)
      }
      return newAccount
    } else {
      console.error('MetaMask read account failed, accounts[0] is undefined')
      // this.showMessage('MetaMask read account failed')
    }
  }

  // return string
  getNetworkId() {
    const network = window.ethereum?.networkVersion || null
    console.log('network', network, typeof network)
    return network
  }
}
