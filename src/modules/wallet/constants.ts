import { Connector } from 'modules/wallet/types'

import MetaMaskLogo from 'modules/wallet/images/meta-mask-logo.svg'
import WalletConnectLogo from 'modules/wallet/images/wallet-connect-logo.svg'
import MetaMaskController from 'modules/wallet/stores/controllers/MetaMask'
import WalletConnectController from 'modules/wallet/stores/controllers/WalletConnect'

export enum MetaMaskMethod {
  GetPermissons = 'wallet_getPermissions',
  RequestAccounts = 'eth_requestAccounts',
  SwitchChain = 'wallet_switchEthereumChain',
}

export enum MetaMaskRPCApi {
  ChainChanged = 'chainChanged',
  AccountsChanged = 'accountsChanged',
}

export enum ConnectorId {
  MetaMask = 'metaMask',
  WalletConnect = 'walletConnect',
}

export enum ConnectorName {
  MetaMask = 'MetaMask',
  WalletConnect = 'WalletConnect',
}

export const connectorList = [
  {
    name: ConnectorName.MetaMask,
    logo: MetaMaskLogo,
    connectorId: ConnectorId.MetaMask,
  },
  {
    name: ConnectorName.WalletConnect,
    logo: WalletConnectLogo,
    connectorId: ConnectorId.WalletConnect,
  },
] as Connector[]

export const ConnectorList = Object.freeze(connectorList)

const walletMapper = {
  [ConnectorId.MetaMask]: MetaMaskController,
  [ConnectorId.WalletConnect]: WalletConnectController,
}

export const WALLET_MAPPER = Object.freeze(walletMapper)
