import { renderHook } from '@testing-library/react-hooks'

import createContextWrapper from 'test/utils/createContextWrapper'

import Token from 'common/constants/tokens/bsc'
import WalletBalanceContext from 'modules/wallet/stores/contexts/WalletBalanceContext'

import * as useGetTokenBalanceFromSymbolType from '.'

describe('useGetTokenBalanceFromSymbol', () => {
  const { default: useGetTokenBalanceFromSymbol } =
    require('.') as typeof useGetTokenBalanceFromSymbolType

  it('should return token balance if can find symbol', () => {
    const { result } = renderHook(() => useGetTokenBalanceFromSymbol('BUSD'), {
      wrapper: createContextWrapper(WalletBalanceContext, {
        BUSD: {
          address: Token.Busd,
          name: 'BUSD Token',
          symbol: 'BUSD',
          balance: 10,
        },
      }),
    })

    expect(result.current).toStrictEqual({
      address: Token.Busd,
      name: 'BUSD Token',
      symbol: 'BUSD',
      balance: 10,
    })
  })

  it('should return undefined if can not find symbol', () => {
    const { result } = renderHook(() => useGetTokenBalanceFromSymbol('USDT'), {
      wrapper: createContextWrapper(WalletBalanceContext, {
        BUSD: {
          address: Token.Busd,
          name: 'BUSD Token',
          symbol: 'BUSD',
          balance: 10,
        },
      }),
    })

    expect(result.current).toBeUndefined()
  })
})
