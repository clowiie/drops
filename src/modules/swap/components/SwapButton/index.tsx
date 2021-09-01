import React from 'react'

import { get } from 'lodash'
import { Link } from 'react-router-dom'

import buildQueryParams from 'common/utils/buildQueryParams'
import useWalletContext from 'modules/wallet/hooks/useWalletContext'
import useGetSwapTokenBalance from 'modules/swap/hooks/useGetSwapTokenBalance'
import useSwapToken from 'modules/swap/hooks/useSwapToken'
import useApproveToken from 'modules/swap/hooks/useApproveToken'

import { DISABLE_BUTTON_CLASS, ACTIVE_BUTTON_CLASS } from './constants'
import { Props } from './types'

const SwapButton = ({ amountIn = 0 }: Props) => {
  const to = buildQueryParams({ modalConnectWallet: true })

  const { walletAddress } = useWalletContext()
  const { fromTokenBalance, toTokenBalance } = useGetSwapTokenBalance()
  const { isApprovedToken, onClickApprove } = useApproveToken()
  const onClickSwap = useSwapToken(`${amountIn}`)

  if (!walletAddress) {
    return (
      <Link className={ACTIVE_BUTTON_CLASS} to={to}>
        Connect Wallet
      </Link>
    )
  }

  if (!fromTokenBalance || !toTokenBalance) {
    return (
      <button className={DISABLE_BUTTON_CLASS} disabled>
        Select Token
      </button>
    )
  }

  if (!amountIn) {
    return (
      <button className={DISABLE_BUTTON_CLASS} disabled>
        Enter an amount
      </button>
    )
  }

  if (amountIn > get(fromTokenBalance, 'balance', 0)) {
    return (
      <button className={DISABLE_BUTTON_CLASS} disabled>
        Insufficient {fromTokenBalance.symbol} balance
      </button>
    )
  }

  if (!isApprovedToken) {
    return (
      <button className={ACTIVE_BUTTON_CLASS} onClick={onClickApprove}>
        Approve
      </button>
    )
  }

  return (
    <button className={ACTIVE_BUTTON_CLASS} onClick={onClickSwap}>
      Swap
    </button>
  )
}

export default SwapButton
