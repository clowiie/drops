import { useState, useEffect, useCallback } from 'react'

import JsonRpcController from 'modules/rpc/stores/controllers/JsonRpc'
import useRequestApproveToken from 'modules/swap/hooks/useRequestApproveToken'
import useSwapTokenContext from 'modules/swap/hooks/useSwapTokenContext'
import useHandleSubmitTransaction from 'modules/transaction/hooks/useHandleSubmitTransaction'
import usePendingTransactionContext from 'modules/transaction/hooks/usePendingTransactionContext'
import useWalletContext from 'modules/wallet/hooks/useWalletContext'
import useGetTokenBalanceFromSymbol from 'modules/wallet/hooks/useGetTokenBalanceFromSymbol'

const useApproveToken = () => {
  const [isApprovedToken, setIsApprovedToken] = useState(false)

  const { pendingHashes } = usePendingTransactionContext()
  const { walletAddress } = useWalletContext()

  const requestApproveToken = useRequestApproveToken()
  const requestApproveTokenWithHandling =
    useHandleSubmitTransaction(requestApproveToken)

  const { fromToken } = useSwapTokenContext()
  const fromTokenBalance = useGetTokenBalanceFromSymbol(fromToken)
  const fromTokenAddress = fromTokenBalance?.address

  const validateApprovedToken = useCallback(async () => {
    setIsApprovedToken(false)

    if (!fromTokenAddress || !walletAddress) {
      setIsApprovedToken(false)
      return
    }

    const checkAmountsApprove =
      await JsonRpcController.checkTokenAmountsApproved(
        walletAddress,
        fromTokenAddress,
      )

    if (+checkAmountsApprove <= 0) {
      setIsApprovedToken(false)
      return
    }

    setIsApprovedToken(true)
  }, [fromTokenAddress, walletAddress])

  const onClickApprove = useCallback(async () => {
    if (!fromTokenAddress) return

    await requestApproveTokenWithHandling(fromTokenAddress)
  }, [fromTokenAddress])

  useEffect(() => {
    validateApprovedToken()
  }, [fromToken, walletAddress, pendingHashes])

  return {
    isApprovedToken,
    onClickApprove,
  }
}

export default useApproveToken
