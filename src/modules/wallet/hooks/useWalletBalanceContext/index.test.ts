import { renderHook } from '@testing-library/react-hooks'

import createContextWrapper from 'test/utils/createContextWrapper'

import Token from 'common/constants/tokens/bsc'
import WalletBalanceContext from 'modules/wallet/stores/contexts/WalletBalanceContext'

import * as useWalletBalanceContextType from '.'

describe('useWalletBalanceContext', () => {
  const { default: useWalletBalanceContext } =
    require('.') as typeof useWalletBalanceContextType

  it('should return wallet address balance context', () => {
    const { result } = renderHook(() => useWalletBalanceContext(), {
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
      BUSD: {
        address: Token.Busd,
        name: 'BUSD Token',
        symbol: 'BUSD',
        balance: 10,
      },
    })
  })

  it('should return wallet address balance context with empty state', () => {
    const { result } = renderHook(() => useWalletBalanceContext(), {
      wrapper: createContextWrapper(WalletBalanceContext, {}),
    })

    expect(result.current).toStrictEqual({})
  })
})
