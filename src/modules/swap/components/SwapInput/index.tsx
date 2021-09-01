import React from 'react'

import { Link } from 'react-router-dom'

import useGetFormatBalance from 'modules/wallet/hooks/useGetFormatBalance'
import useGetTokenBalanceFromSymbol from 'modules/wallet/hooks/useGetTokenBalanceFromSymbol'

import { Props } from './types'

const SwapInput = ({
  title, to, tokenSymbol, value, onChange,
}: Props) => {
  const tokenBalance = useGetTokenBalanceFromSymbol(tokenSymbol)
  const balance = useGetFormatBalance(tokenBalance?.balance)

  const button = tokenBalance ? (
    <div className="flex items-center">
      <img
        className="w-7 object-contain"
        src={tokenBalance.logo}
        alt={`${tokenBalance.symbol} Logo`}
        loading="lazy"
      />

      <div className="ml-2">
        <span className="font-semibold text-sm">{tokenBalance.symbol}</span>
      </div>
    </div>
  ) : (
    <span className="text-sm">Select a currency</span>
  )

  return (
    <div className="grid gap-y-2">
      <div className="flex justify-between">
        <span className="text-sm">{title}</span>
        <span className="text-sm">{balance && `Balance: ${balance}`}</span>
      </div>

      <div className="flex justify-between items-center">
        <input
          value={value}
          onChange={onChange}
          className="h-full bg-gray-50 rounded-l-md flex-1 p-2 outline-none"
          type="number"
          placeholder="0.0"
        />

        <div className="h-full border border-gray-300 flex rounded-r-md hover:bg-gray-50">
          <Link className="p-2 " to={to}>
            {button}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SwapInput
