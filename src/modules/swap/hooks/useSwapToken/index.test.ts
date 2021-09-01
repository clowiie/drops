import { renderHook } from '@testing-library/react-hooks'

import createContextWrapper from 'test/utils/createContextWrapper'

import Token from 'common/constants/tokens/bsc'
import WalletContext from 'modules/wallet/stores/contexts/WalletContext'

import * as useSwapTokenType from '.'

describe('useSwapToken', () => {
  const useRequestSwapTokenSpy = jest.fn()
  const requestSwapTokenSpy = jest.fn()
  jest.doMock(
    'modules/swap/hooks/useRequestSwapToken',
    () => useRequestSwapTokenSpy,
  )

  const useGetSwapTokenBalanceSpy = jest.fn()
  jest.doMock(
    'modules/swap/hooks/useGetSwapTokenBalance',
    () => useGetSwapTokenBalanceSpy,
  )

  const useHandleSubmitTransactionSpy = jest.fn()
  jest.doMock(
    'modules/transaction/hooks/useHandleSubmitTransaction',
    () => useHandleSubmitTransactionSpy,
  )

  const { default: useSwapToken } = require('.') as typeof useSwapTokenType

  beforeEach(() => {
    useRequestSwapTokenSpy.mockReturnValue(requestSwapTokenSpy)

    useGetSwapTokenBalanceSpy.mockReturnValue({
      fromTokenBalance: {
        address: Token.Bunny,
      },
      toTokenBalance: {
        address: Token.Cake,
      },
    })

    useHandleSubmitTransactionSpy.mockImplementation((action) => action)
  })

  it('should call swap token', async () => {
    const { result } = renderHook(() => useSwapToken('100'), {
      wrapper: createContextWrapper(WalletContext, {
        walletAddress: 'walletAddress',
      }),
    })

    await result.current()

    expect(useRequestSwapTokenSpy).toBeCalledTimes(1)
    expect(useHandleSubmitTransactionSpy).toBeCalledWith(requestSwapTokenSpy)
    expect(useGetSwapTokenBalanceSpy).toBeCalledTimes(1)
    expect(requestSwapTokenSpy).toBeCalledWith({
      amountIn: '100',
      token0: '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
      token1: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      walletAddress: 'walletAddress',
    })
  })

  it('do nothing if not have amout in', async () => {
    const { result } = renderHook(() => useSwapToken(), {
      wrapper: createContextWrapper(WalletContext, {
        walletAddress: 'walletAddress',
      }),
    })

    await result.current()

    expect(useRequestSwapTokenSpy).toBeCalledTimes(1)
    expect(useHandleSubmitTransactionSpy).toBeCalledWith(requestSwapTokenSpy)
    expect(useGetSwapTokenBalanceSpy).toBeCalledTimes(1)
    expect(requestSwapTokenSpy).not.toBeCalled()
  })
})
