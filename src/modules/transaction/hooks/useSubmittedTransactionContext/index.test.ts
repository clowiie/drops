import { renderHook } from '@testing-library/react-hooks'

import createContextWrapper from 'test/utils/createContextWrapper'

import SubmittedTransactionContext from 'modules/transaction/stores/contexts/SubmittedTransactionContext'

import * as useSubmittedTransactionContextType from '.'

describe('useSubmittedTransactionContext', () => {
  const mockSetSubmittedHash = jest.fn()
  const mockClearSubmitted = jest.fn()

  const { default: useSubmittedTransactionContext } =
    require('.') as typeof useSubmittedTransactionContextType

  it('should return submitted transaction context', () => {
    const { result } = renderHook(() => useSubmittedTransactionContext(), {
      wrapper: createContextWrapper(SubmittedTransactionContext, {
        submittedHash: 'hash',
        setSubmittedHash: mockSetSubmittedHash,
        clearSubmitted: mockClearSubmitted,
      }),
    })

    expect(result.current.submittedHash).toBe('hash')
    expect(result.current.setSubmittedHash).not.toBeUndefined()
    expect(result.current.clearSubmitted).not.toBeUndefined()
  })

  it('should return submitted transaction context with empty hash', () => {
    const { result } = renderHook(() => useSubmittedTransactionContext(), {
      wrapper: createContextWrapper(SubmittedTransactionContext, {
        submittedHash: '',
        setSubmittedHash: mockSetSubmittedHash,
        clearSubmitted: mockClearSubmitted,
      }),
    })

    expect(result.current.submittedHash).toBe('')
    expect(result.current.setSubmittedHash).not.toBeUndefined()
    expect(result.current.clearSubmitted).not.toBeUndefined()
  })
})
