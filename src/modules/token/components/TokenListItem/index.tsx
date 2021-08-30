import React, { useCallback } from 'react'

import useGetFormatBalance from 'modules/wallet/hooks/useGetFormatBalance'

import { Props } from './types'

const TokenListItem = ({ token, getToken, disabled }: Props) => {
  const onClick = useCallback(() => {
    if (disabled) return
    getToken(token.symbol)
  }, [disabled, token, getToken])

  const balance = useGetFormatBalance(token.balance)

  return (
    <div
      className={`px-4 py-2 flex items-center ${
        disabled ? 'opacity-40' : 'hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <img
        className="w-7 object-contain"
        src={token.logo}
        alt={`${token.symbol} Logo`}
        loading="lazy"
      />

      <div className="flex-1 px-2">
        <div>
          <span className="font-semibold">{token.symbol}</span>
        </div>
        <div>
          <span className="text-sm text-gray-500">{token.name}</span>
        </div>
      </div>

      <div>
        <span className="text-sm">{balance && balance}</span>
      </div>
    </div>
  )
}

export default TokenListItem
