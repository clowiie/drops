import { useCallback } from 'react'

import useRequestSwapToken from 'modules/swap/hooks/useRequestSwapToken'
import useGetSwapTokenBalance from 'modules/swap/hooks/useGetSwapTokenBalance'
import useHandleSubmitTransaction from 'modules/transaction/hooks/useHandleSubmitTransaction'
import useWalletContext from 'modules/wallet/hooks/useWalletContext'

const useSwapToken = (amountIn?: string) => {
  const { walletAddress } = useWalletContext()
  const requestSwapToken = useRequestSwapToken()
  const requestSwapTokenWithHandling = useHandleSubmitTransaction(requestSwapToken)

  const { fromTokenBalance, toTokenBalance } = useGetSwapTokenBalance()
  const fromTokenAddress = fromTokenBalance?.address
  const toTokenAddress = toTokenBalance?.address

  return useCallback(async () => {
    if (!amountIn || !fromTokenAddress || !toTokenAddress) return

    await requestSwapTokenWithHandling({
      walletAddress,
      amountIn,
      token0: fromTokenAddress,
      token1: toTokenAddress,
    })
  }, [walletAddress, amountIn, fromTokenAddress, toTokenAddress])
}

export default useSwapToken
