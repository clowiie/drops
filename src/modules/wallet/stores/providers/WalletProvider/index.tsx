import React, { FC } from 'react'

import useInitWallet from 'modules/wallet/hooks/useInitWallet'
import WalletContext from 'modules/wallet/stores/contexts/WalletContext'

const WalletProvider: FC = ({ children }) => {
  const wallet = useInitWallet()

  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletProvider
