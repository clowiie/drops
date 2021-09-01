import { act, renderHook } from '@testing-library/react-hooks'

import * as useSubmittedTransactionType from '.'

describe('useSubmittedTransaction', () => {
  const { default: useSubmittedTransaction } =
    require('.') as typeof useSubmittedTransactionType

  it('should return submitted transaction state', () => {
    const { result } = renderHook(() => useSubmittedTransaction())

    expect(result.current.submittedHash).toBe('')
    expect(result.current.setSubmittedHash).not.toBeUndefined()
    expect(result.current.clearSubmitted).not.toBeUndefined()
  })

  it('should set submittedHash when call setSubmittedHash', () => {
    const { result } = renderHook(() => useSubmittedTransaction())

    act(() => {
      result.current.setSubmittedHash('hash')
    })

    expect(result.current.submittedHash).toBe('hash')
  })

  it('should clear submittedHash when call clearSubmitted', () => {
    const { result } = renderHook(() => useSubmittedTransaction())

    act(() => {
      result.current.clearSubmitted()
    })

    expect(result.current.submittedHash).toBe('')
  })
})
