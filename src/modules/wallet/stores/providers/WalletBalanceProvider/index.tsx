import React, { FC } from 'react'

import useGetWalletBalance from 'modules/wallet/hooks/useGetWalletBalance'
import WalletBalanceContext from 'modules/wallet/stores/contexts/WalletBalanceContext'

const WalletBalanceProvider: FC = ({ children }) => {
  const walletBalances = useGetWalletBalance()

  return (
    <WalletBalanceContext.Provider value={walletBalances}>
      {children}
    </WalletBalanceContext.Provider>
  )
}

export default WalletBalanceProvider
