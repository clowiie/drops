import { ethers } from 'ethers'

import { ConnectorName, ConnectorId } from 'modules/wallet/constants'
import { TokenType } from 'modules/token/types'

export interface WalletBalance extends TokenType {
  contract?: ethers.Contract
  balance?: number
}

export interface Connector {
  name: ConnectorName
  logo: string
  connectorId: ConnectorId
}
