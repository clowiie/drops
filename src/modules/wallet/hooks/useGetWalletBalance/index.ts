import { useCallback, useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

import Token from 'common/constants/tokens/bsc'
import { TokenList } from 'modules/token/constants'

import JsonRpcController from 'modules/rpc/stores/controllers/JsonRpc'
import usePendingTransactionContext from 'modules/transaction/hooks/usePendingTransactionContext'
import useWalletContext from 'modules/wallet/hooks/useWalletContext'
import { WalletBalance } from 'modules/wallet/types'

let interval: NodeJS.Timeout

const useGetWalletBalance = () => {
  const [walletBalances, setWalletBalances] = useState<
    Record<string, WalletBalance>
  >({})

  const { pendingHashes } = usePendingTransactionContext()
  const { walletAddress } = useWalletContext()

  const getWalletBalances = useCallback(async () => {
    if (!walletAddress) {
      setWalletBalances(TokenList)
      return
    }

    const balances = cloneDeep(TokenList) as Record<string, WalletBalance>
    const tokenKeys = Object.keys(balances)

    await Promise.all(
      tokenKeys.map(async (key) => {
        const symbol = key as Token
        const token = balances[symbol]
        const { contract, balance } =
          await JsonRpcController.getTokenContractAndBalance(
            walletAddress,
            token.address,
          )

        balances[symbol].contract = contract
        balances[symbol].balance = balance
      }),
    )

    setWalletBalances(balances)
  }, [walletAddress])

  useEffect(() => {
    getWalletBalances()

    interval = setInterval(() => {
      getWalletBalances()
    }, 25000)

    return () => {
      clearInterval(interval)
    }
  }, [walletAddress, pendingHashes])

  return walletBalances
}

export default useGetWalletBalance
