import React from 'react'

import { useLocation } from 'react-router-dom'

import parseQS from 'common/utils/parseQS'
import ConnectWalletModal from 'modules/wallet/components/ConnectWalletModal'

const ConnectWalletModalController = () => {
  const { search } = useLocation()
  const { modalConnectWallet } = parseQS(search)

  if (!modalConnectWallet) return null

  return <ConnectWalletModal isOpen={!!modalConnectWallet} />
}

export default ConnectWalletModalController
