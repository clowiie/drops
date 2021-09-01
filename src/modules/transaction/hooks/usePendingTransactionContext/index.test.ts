import { renderHook } from '@testing-library/react-hooks'

import createContextWrapper from 'test/utils/createContextWrapper'

import PendingTransactionContext from 'modules/transaction/stores/contexts/PendingTransactionContext'

import * as usePendingTransactionContextType from '.'

describe('usePendingTransactionContext', () => {
  const mockSetPendingHashes = jest.fn()

  const { default: usePendingTransactionContext } =
    require('.') as typeof usePendingTransactionContextType

  it('should return submitted transaction context', () => {
    const { result } = renderHook(() => usePendingTransactionContext(), {
      wrapper: createContextWrapper(PendingTransactionContext, {
        pendingHashes: ['hash1', 'hash2'],
        hasPendingHash: true,
        setPendingHashes: mockSetPendingHashes,
      }),
    })

    expect(result.current.pendingHashes).toStrictEqual(['hash1', 'hash2'])
    expect(result.current.hasPendingHash).toBe(true)
    expect(result.current.setPendingHashes).not.toBeUndefined()
  })

  it('should return submitted transaction context with empty hash', () => {
    const { result } = renderHook(() => usePendingTransactionContext(), {
      wrapper: createContextWrapper(PendingTransactionContext, {
        pendingHashes: [],
        hasPendingHash: false,
        setPendingHashes: mockSetPendingHashes,
      }),
    })

    expect(result.current.pendingHashes).toStrictEqual([])
    expect(result.current.hasPendingHash).toBe(false)
    expect(result.current.setPendingHashes).not.toBeUndefined()
  })
})
