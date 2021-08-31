import { ConnectorId, WALLET_MAPPER } from 'modules/wallet/constants'
import MetaMaskController from 'modules/wallet/stores/controllers/MetaMask'
import WalletConnectController from 'modules/wallet/stores/controllers/WalletConnect'
import { CONNECTOR_ID } from 'modules/wallet/stores/controllers/constants'

class WalletController {
  static wallet?: MetaMaskController | WalletConnectController

  static setWallet: (address: string) => void

  static initSetWallet(setWallet: (address: string) => void) {
    this.setWallet = setWallet
  }

  static async activate() {
    const connectorId = localStorage.getItem(CONNECTOR_ID) as ConnectorId | null

    if (!connectorId) return

    this.wallet = new WALLET_MAPPER[connectorId]()
    await this.wallet.activate()
  }

  static async connectWallet(connectorId: ConnectorId) {
    if (this.wallet) {
      await this.deactivate()
    }

    this.wallet = new WALLET_MAPPER[connectorId]()

    await this.wallet.connectWallet()

    localStorage.setItem(CONNECTOR_ID, connectorId)
  }

  static async deactivate() {
    await this.wallet?.deactivate()
    localStorage.removeItem(CONNECTOR_ID)
    this.wallet = undefined
    this.setWallet('')
  }
}

export default WalletController
