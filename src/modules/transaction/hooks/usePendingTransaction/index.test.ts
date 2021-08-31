import { act, renderHook } from '@testing-library/react-hooks'
import timemachine from 'timemachine'

import * as usePendingTransactionType from '.'

describe('usePendingTransaction', () => {
  const showErrorToastSpy = jest.fn()
  jest.doMock('common/utils/showErrorToast', () => showErrorToastSpy)

  const showSuccessToastSpy = jest.fn()
  jest.doMock('common/utils/showSuccessToast', () => showSuccessToastSpy)

  const getTransactionReceiptSpy = jest.fn()
  jest.doMock('modules/rpc/stores/controllers/JsonRpc', () => ({
    provider: {
      getTransactionReceipt: getTransactionReceiptSpy,
    },
  }))

  const { default: usePendingTransaction } =
    require('.') as typeof usePendingTransactionType

  beforeEach(() => {
    timemachine.config({
      timestamp: 1630333907271,
    })

    getTransactionReceiptSpy.mockReturnValue({
      hash: 'hash',
      status: 1,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return pending transaction state', () => {
    const { result } = renderHook(() => usePendingTransaction())

    expect(result.current.pendingHashes).toStrictEqual([])
    expect(result.current.hasPendingHash).toBe(false)
    expect(result.current.setPendingHashes).not.toBeUndefined()
    expect(getTransactionReceiptSpy).not.toBeCalled()
  })

  it('should call getTransactionReceipt when pendingHashes has changed with transaction successed', async () => {
    const { result, waitFor } = renderHook(() => usePendingTransaction())

    act(() => {
      result.current.setPendingHashes(['hash'])

      jest.advanceTimersByTime(3000)
    })

    await waitFor(() => {
      expect(getTransactionReceiptSpy).toBeCalledWith('hash')
      expect(showSuccessToastSpy).toBeCalledWith('Transaction Successed')
      expect(result.current.pendingHashes).toStrictEqual([])
    })
  })

  it('should call getTransactionReceipt when pendingHashes has changed with transaction failed', async () => {
    getTransactionReceiptSpy.mockReturnValue({
      hash: 'hash',
      status: 0,
    })

    const { result, waitFor } = renderHook(() => usePendingTransaction())

    act(() => {
      result.current.setPendingHashes(['hash'])

      jest.advanceTimersByTime(3000)
    })

    await waitFor(() => {
      expect(getTransactionReceiptSpy).toBeCalledWith('hash')
      expect(showErrorToastSpy).toBeCalledWith('Transaction Failed')
      expect(result.current.pendingHashes).toStrictEqual([])
    })
  })
})
