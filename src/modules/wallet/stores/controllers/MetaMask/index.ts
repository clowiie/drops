import { ethers } from 'ethers'
import { isEmpty } from 'lodash'

import Chains from 'common/constants/chains'

import { MetaMaskMethod, MetaMaskRPCApi } from 'modules/wallet/constants'
import WalletController from 'modules/wallet/stores/controllers/Wallet'
import validateBSCNetwork from 'modules/wallet/utils/validateBSCNetwork'
import { CONNECTOR_ID } from 'modules/wallet/stores/controllers/constants'

class MetaMaskController {
  provider: ethers.providers.Web3Provider

  constructor() {
    if (!window.ethereum) throw new Error('No provider was found')

    this.provider = new ethers.providers.Web3Provider(window.ethereum)
  }

  handleChainChange = async (chainIdHex: string) => {
    if (chainIdHex === Chains.BNB.chainIdHex) {
      await this.setWallet()
    } else {
      WalletController.setWallet('')
    }
  }

  handleAccountChange = (accounts: string[]) => {
    if (isEmpty(accounts)) {
      this.deactivate()
    }

    WalletController.setWallet(accounts[0])
  }

  addListener = () => {
    window.ethereum.on(MetaMaskRPCApi.ChainChanged, this.handleChainChange)
    window.ethereum.on(MetaMaskRPCApi.AccountsChanged, this.handleAccountChange)
  }

  getSigner() {
    return this.provider.getSigner()
  }

  async getAddress() {
    await this.provider.send(MetaMaskMethod.RequestAccounts, [])
    const signer = this.getSigner()

    const selectedAddress = await signer.getAddress()
    return selectedAddress
  }

  async validatePermissions() {
    const permissions = await this.provider.send(
      MetaMaskMethod.GetPermissons,
      [],
    )

    if (isEmpty(permissions)) return false

    return true
  }

  async requestChangeNetWork() {
    const network = await this.provider.getNetwork()

    if (!validateBSCNetwork(network)) {
      await this.provider.send(MetaMaskMethod.SwitchChain, [
        { chainId: Chains.BNB.chainIdHex },
      ])
    }
  }

  async setWallet() {
    const address = await this.getAddress()
    WalletController.setWallet(address)
  }

  async connectWallet() {
    const address = await this.getAddress()

    await this.requestChangeNetWork()

    WalletController.setWallet(address)

    this.addListener()
  }

  async activate() {
    const hasPermission = await this.validatePermissions()

    if (!hasPermission) {
      localStorage.removeItem(CONNECTOR_ID)
      return
    }

    await this.requestChangeNetWork()
    await this.setWallet()

    this.addListener()
  }

  deactivate() {
    window.ethereum.removeListener(
      MetaMaskRPCApi.ChainChanged,
      this.handleChainChange,
    )

    window.ethereum.removeListener(
      MetaMaskRPCApi.AccountsChanged,
      this.handleAccountChange,
    )
  }
}

export default MetaMaskController
