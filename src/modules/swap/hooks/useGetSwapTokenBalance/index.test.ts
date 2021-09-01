import { renderHook } from '@testing-library/react-hooks'

import combineWrappers from 'test/utils/combineWrappers'
import createContextWrapper from 'test/utils/createContextWrapper'

import Token from 'common/constants/tokens/bsc'
import SwapTokenContext from 'modules/swap/stores/contexts/SwapTokenContext'
import WalletBalanceContext from 'modules/wallet/stores/contexts/WalletBalanceContext'

import * as useGetSwapTokenBalanceType from '.'

describe('useGetSwapTokenBalance', () => {
  const { default: useGetSwapTokenBalance } =
    require('.') as typeof useGetSwapTokenBalanceType

  it('should return swap token info', () => {
    const { result } = renderHook(() => useGetSwapTokenBalance(), {
      wrapper: combineWrappers(
        createContextWrapper(SwapTokenContext, {
          fromToken: 'BUSD',
          toToken: 'CAKE',
          setFromToken: () => {},
          setToToken: () => {},
        }),
        createContextWrapper(WalletBalanceContext, {
          BUSD: {
            address: Token.Busd,
            name: 'BUSD Token',
            symbol: 'BUSD',
            balance: 10,
          },
          CAKE: {
            address: Token.Cake,
            name: 'CAKE Token',
            symbol: 'CAKE',
            balance: 100,
          },
        }),
      ),
    })

    expect(result.current).toStrictEqual({
      fromTokenBalance: {
        address: Token.Busd,
        name: 'BUSD Token',
        symbol: 'BUSD',
        balance: 10,
      },
      toTokenBalance: {
        address: Token.Cake,
        name: 'CAKE Token',
        symbol: 'CAKE',
        balance: 100,
      },
    })
  })
})
