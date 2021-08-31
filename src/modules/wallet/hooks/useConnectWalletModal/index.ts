import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import WalletController from 'modules/wallet/stores/controllers/Wallet'
import { ConnectorId } from 'modules/wallet/constants'

const useConnectWalletModal = () => {
  const history = useHistory()

  const closeModal = useCallback(() => {
    history.goBack()
  }, [history])

  const connectWallet = useCallback(
    async (connectorId: ConnectorId) => {
      await WalletController.connectWallet(connectorId)
      closeModal()
    },
    [closeModal],
  )

  return {
    closeModal,
    connectWallet,
  }
}

export default useConnectWalletModal
