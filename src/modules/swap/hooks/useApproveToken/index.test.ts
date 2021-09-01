import { renderHook } from '@testing-library/react-hooks'

import combineWrappers from 'test/utils/combineWrappers'
import createContextWrapper from 'test/utils/createContextWrapper'

import Token from 'common/constants/tokens/bsc'
import SwapTokenContext from 'modules/swap/stores/contexts/SwapTokenContext'
import PendingTransactionContext from 'modules/transaction/stores/contexts/PendingTransactionContext'
import WalletContext from 'modules/wallet/stores/contexts/WalletContext'

import * as useApproveTokenType from '.'

describe('useApproveToken', () => {
  const checkTokenAmountsApprovedSpy = jest.fn()
  jest.doMock('modules/rpc/stores/controllers/JsonRpc', () => ({
    checkTokenAmountsApproved: checkTokenAmountsApprovedSpy,
  }))

  const useRequestApproveTokenSpy = jest.fn()
  const requestApproveTokenSpy = jest.fn()
  jest.doMock(
    'modules/swap/hooks/useRequestApproveToken',
    () => useRequestApproveTokenSpy,
  )

  const useHandleSubmitTransactionSpy = jest.fn()
  jest.doMock(
    'modules/transaction/hooks/useHandleSubmitTransaction',
    () => useHandleSubmitTransactionSpy,
  )

  const useGetTokenBalanceFromSymbolSpy = jest.fn()
  jest.doMock(
    'modules/wallet/hooks/useGetTokenBalanceFromSymbol',
    () => useGetTokenBalanceFromSymbolSpy,
  )

  const { default: useApproveToken } =
    require('.') as typeof useApproveTokenType

  beforeEach(() => {
    checkTokenAmountsApprovedSpy.mockReturnValue('1000000')

    useRequestApproveTokenSpy.mockReturnValue(requestApproveTokenSpy)

    useGetTokenBalanceFromSymbolSpy.mockReturnValue({
      address: Token.Bunny,
    })

    useHandleSubmitTransactionSpy.mockImplementation((action) => action)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call validateApprovedToken with happy flow', async () => {
    const { result, waitFor } = renderHook(() => useApproveToken(), {
      wrapper: combineWrappers(
        createContextWrapper(SwapTokenContext, {
          fromToken: 'BUSD',
          setFromToken: () => {},
          setToToken: () => {},
        }),
        createContextWrapper(PendingTransactionContext, {
          pendingHashes: ['hash1', 'hash2'],
          hasPendingHash: true,
          setPendingHashes: () => {},
        }),
        createContextWrapper(WalletContext, {
          walletAddress: 'walletAddress',
        }),
      ),
    })

    await waitFor(() => {
      expect(checkTokenAmountsApprovedSpy).toBeCalledTimes(1)
      expect(checkTokenAmountsApprovedSpy).toBeCalledWith(
        'walletAddress',
        '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
      )
      expect(result.current.isApprovedToken).toBe(true)
    })
  })

  it('should call validateApprovedToken without wallet address', async () => {
    const { result, waitFor } = renderHook(() => useApproveToken(), {
      wrapper: combineWrappers(
        createContextWrapper(SwapTokenContext, {
          fromToken: 'BUSD',
          setFromToken: () => {},
          setToToken: () => {},
        }),
        createContextWrapper(PendingTransactionContext, {
          pendingHashes: ['hash1', 'hash2'],
          hasPendingHash: true,
          setPendingHashes: () => {},
        }),
        createContextWrapper(WalletContext, {
          walletAddress: '',
        }),
      ),
    })

    await waitFor(() => {
      expect(checkTokenAmountsApprovedSpy).not.toBeCalled()
      expect(result.current.isApprovedToken).toBe(false)
    })
  })

  it('should call validateApprovedToken without fromTokenAddress', async () => {
    useGetTokenBalanceFromSymbolSpy.mockReturnValue(null)

    const { result, waitFor } = renderHook(() => useApproveToken(), {
      wrapper: combineWrappers(
        createContextWrapper(SwapTokenContext, {
          fromToken: 'BUSD',
          setFromToken: () => {},
          setToToken: () => {},
        }),
        createContextWrapper(PendingTransactionContext, {
          pendingHashes: ['hash1', 'hash2'],
          hasPendingHash: true,
          setPendingHashes: () => {},
        }),
        createContextWrapper(WalletContext, {
          walletAddress: 'walletAddress',
        }),
      ),
    })

    await waitFor(() => {
      expect(checkTokenAmountsApprovedSpy).not.toBeCalled()
      expect(result.current.isApprovedToken).toBe(false)
    })
  })

  it('should call validateApprovedToken without approved token', async () => {
    checkTokenAmountsApprovedSpy.mockReturnValue('0')

    const { result, waitFor } = renderHook(() => useApproveToken(), {
      wrapper: combineWrappers(
        createContextWrapper(SwapTokenContext, {
          fromToken: 'BUSD',
          setFromToken: () => {},
          setToToken: () => {},
        }),
        createContextWrapper(PendingTransactionContext, {
          pendingHashes: ['hash1', 'hash2'],
          hasPendingHash: true,
          setPendingHashes: () => {},
        }),
        createContextWrapper(WalletContext, {
          walletAddress: 'walletAddress',
        }),
      ),
    })

    await waitFor(() => {
      expect(checkTokenAmountsApprovedSpy).toBeCalledTimes(1)
      expect(checkTokenAmountsApprovedSpy).toBeCalledWith(
        'walletAddress',
        '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
      )
      expect(result.current.isApprovedToken).toBe(false)
    })
  })

  it('onClickApprove should call requestApproveToken', async () => {
    const { result } = renderHook(() => useApproveToken(), {
      wrapper: combineWrappers(
        createContextWrapper(SwapTokenContext, {
          fromToken: 'BUSD',
          setFromToken: () => {},
          setToToken: () => {},
        }),
        createContextWrapper(PendingTransactionContext, {
          pendingHashes: ['hash1', 'hash2'],
          hasPendingHash: true,
          setPendingHashes: () => {},
        }),
        createContextWrapper(WalletContext, {
          walletAddress: 'walletAddress',
        }),
      ),
    })

    await result.current.onClickApprove()

    expect(requestApproveTokenSpy).toBeCalledTimes(1)
    expect(requestApproveTokenSpy).toBeCalledWith(
      '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
    )
  })

  it('onClickApprove should do nothing if not have from token', async () => {
    useGetTokenBalanceFromSymbolSpy.mockReturnValue(null)

    const { result } = renderHook(() => useApproveToken(), {
      wrapper: combineWrappers(
        createContextWrapper(SwapTokenContext, {
          fromToken: 'BUSD',
          setFromToken: () => {},
          setToToken: () => {},
        }),
        createContextWrapper(PendingTransactionContext, {
          pendingHashes: ['hash1', 'hash2'],
          hasPendingHash: true,
          setPendingHashes: () => {},
        }),
        createContextWrapper(WalletContext, {
          walletAddress: 'walletAddress',
        }),
      ),
    })

    await result.current.onClickApprove()

    expect(requestApproveTokenSpy).not.toBeCalled()
  })
})
