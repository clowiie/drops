import { ethers } from 'ethers'
import WalletConnectProvider from '@walletconnect/web3-provider'

import CHAINS from 'common/constants/chains'
import { BSC_RPC_URL } from 'modules/rpc/constants'
import { BRIDGE_URL, POLLING_INTERVAL } from 'modules/wallet/constants'
import WalletController from 'modules/wallet/stores/controllers/Wallet'
import { CONNECTOR_ID } from 'modules/wallet/stores/controllers/constants'

import { WalletConnectorRPCApi } from './constants'

const { chainId } = CHAINS.BNB

class WalletConnectController {
  walletConnector: WalletConnectProvider

  provider: ethers.providers.Web3Provider

  constructor() {
    this.walletConnector = new WalletConnectProvider({
      rpc: { [chainId]: BSC_RPC_URL },
      bridge: BRIDGE_URL,
      pollingInterval: POLLING_INTERVAL,
      qrcode: false,
    })

    this.provider = new ethers.providers.Web3Provider(this.walletConnector)
  }

  handleChainChanged = () => {
    // do nothing
  }

  handleAccountsChanged = () => {
    // do nothing
  }

  handleDisconnect = () => {
    // do nothing
  }

  addListener = () => {
    this.walletConnector.on(
      WalletConnectorRPCApi.ChainChanged,
      this.handleChainChanged,
    )
    this.walletConnector.on(
      WalletConnectorRPCApi.AccountsChanged,
      this.handleAccountsChanged,
    )
    this.walletConnector.on(
      WalletConnectorRPCApi.Disconnect,
      this.handleDisconnect,
    )
  }

  getSigner() {
    this.provider = new ethers.providers.Web3Provider(this.walletConnector)
    return this.provider.getSigner()
  }

  async connectWallet() {
    this.walletConnector = new WalletConnectProvider({
      rpc: { [chainId]: BSC_RPC_URL },
      bridge: BRIDGE_URL,
      qrcode: true,
      pollingInterval: POLLING_INTERVAL,
      chainId,
    })

    const accounts = await this.walletConnector.enable()

    WalletController.setWallet(accounts[0])

    this.addListener()
  }

  async activate() {
    await this.walletConnector.enable()

    if (!this.walletConnector.connected) {
      localStorage.removeItem(CONNECTOR_ID)
      return
    }

    WalletController.setWallet(this.walletConnector.accounts[0])

    this.addListener()
  }

  async deactivate() {
    this.walletConnector.removeListener(
      WalletConnectorRPCApi.ChainChanged,
      this.handleAccountsChanged,
    )
    this.walletConnector.removeListener(
      WalletConnectorRPCApi.AccountsChanged,
      this.handleDisconnect,
    )
    this.walletConnector.removeListener(
      WalletConnectorRPCApi.Disconnect,
      this.handleChainChanged,
    )

    this.walletConnector.disconnect()
  }
}

export default WalletConnectController
