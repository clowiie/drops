import { useEffect, useState } from 'react'

import WalletController from 'modules/wallet/stores/controllers/Wallet'

const useInitWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string>('')

  WalletController.initSetWallet(setWalletAddress)

  useEffect(() => {
    WalletController.activate()
  }, [])

  return {
    walletAddress,
  }
}

export default useInitWallet
