import React from 'react'

import useGetSelectedTokenList from 'modules/swap/hooks/useGetSelectedTokenList'
import useWalletBalanceContext from 'modules/wallet/hooks/useWalletBalanceContext'
import TokenListItem from 'modules/token/components/TokenListItem'

import Token from 'common/constants/tokens/bsc'
import { Props } from './types'

const SwapTokenList = ({ getToken }: Props) => {
  const selectedTokenList = useGetSelectedTokenList()
  const walletBalances = useWalletBalanceContext()

  return (
    <>
      {Object.keys(walletBalances).map((key) => {
        const symbol = key as Token
        const token = walletBalances[symbol]
        return (
          <TokenListItem
            key={token.symbol}
            token={token}
            getToken={getToken}
            disabled={selectedTokenList.includes(token.symbol)}
          />
        )
      })}
    </>
  )
}

export default SwapTokenList
