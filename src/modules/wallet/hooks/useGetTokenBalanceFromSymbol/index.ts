import { useMemo } from 'react'

import useWalletBalanceContext from 'modules/wallet/hooks/useWalletBalanceContext'

const useGetTokenBalanceFromSymbol = (symbol?: string) => {
  const walletBalances = useWalletBalanceContext()

  return useMemo(
    () => symbol ? walletBalances[symbol] : undefined,
    [walletBalances, symbol],
  )
}

export default useGetTokenBalanceFromSymbol
