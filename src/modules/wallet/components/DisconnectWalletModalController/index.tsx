import React from 'react'

import { useLocation } from 'react-router-dom'

import parseQS from 'common/utils/parseQS'
import DisconnectWalletModal from 'modules/wallet/components/DisconnectWalletModal'

const DisconnectWalletModalController = () => {
  const { search } = useLocation()
  const { modalDisconnectWallet } = parseQS(search)

  if (!modalDisconnectWallet) return null

  return <DisconnectWalletModal isOpen={!!modalDisconnectWallet} />
}

export default DisconnectWalletModalController
