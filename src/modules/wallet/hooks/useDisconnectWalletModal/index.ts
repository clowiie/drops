import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import WalletController from 'modules/wallet/stores/controllers/Wallet'

const useDisconnectWalletModal = () => {
  const history = useHistory()

  const closeModal = useCallback(() => {
    history.goBack()
  }, [history])

  const disconnectWallet = useCallback(async () => {
    await WalletController.deactivate()
    closeModal()
  }, [closeModal])

  return {
    closeModal,
    disconnectWallet,
  }
}

export default useDisconnectWalletModal
