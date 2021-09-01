import React from 'react'

import buildQueryParams from 'common/utils/buildQueryParams'
import SwapButton from 'modules/swap/components/SwapButton'
import SwapInput from 'modules/swap/components/SwapInput'
import useSwapTokenContext from 'modules/swap/hooks/useSwapTokenContext'
import useComparePrice from 'modules/swap/hooks/useComparePrice'
import useHandleInputSwap from 'modules/swap/hooks/useHandleInputSwap'
import formatBalance from 'common/utils/formatBalance'
import { InputSwapToken } from 'modules/swap/constants'

import { ESTIMATE } from './constants'

const SwapPlate = () => {
  const { fromToken, toToken } = useSwapTokenContext()
  const comparePrice = useComparePrice()

  const {
    amountIn, amountOut, estimate, onChangeAmountIn, onChangeAmountOut,
  } =
    useHandleInputSwap(comparePrice)

  const toModalGetFromToken = buildQueryParams({ modalGetFromToken: true })
  const toModalGetToToken = buildQueryParams({ modalGetToToken: true })

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white w-full max-w-lg shadow-sm rounded-md mx-2 p-4 sm:p-8 divide-y divide-gray-200">
        <div className="flex flex-col pb-4">
          <span className="text-lg font-semibold">Exchange</span>

          <span>Trade tokens in an instant</span>
        </div>

        <div className="pt-8 grid gap-y-8">
          <SwapInput
            title={`From ${estimate === InputSwapToken.In ? ESTIMATE : ''}`}
            to={toModalGetFromToken}
            tokenSymbol={fromToken}
            value={amountIn}
            onChange={onChangeAmountIn}
          />

          <SwapInput
            title={`To ${estimate === InputSwapToken.Out ? ESTIMATE : ''}`}
            to={toModalGetToToken}
            tokenSymbol={toToken}
            value={amountOut}
            onChange={onChangeAmountOut}
          />

          {comparePrice && (
            <div className="flex justify-between text-sm">
              <span>Price</span>
              <span>
                {formatBalance(comparePrice)} {fromToken} per {toToken}
              </span>
            </div>
          )}

          <SwapButton amountIn={+amountIn} />
        </div>
      </div>
    </div>
  )
}

export default SwapPlate
