import { act, renderHook } from '@testing-library/react-hooks'

import * as useLoadingType from '.'

describe('useLoading', () => {
  const { default: useLoading } = require('.') as typeof useLoadingType

  it('should return loading state', () => {
    const { result } = renderHook(() => useLoading())

    expect(result.current.loading).toBe(false)
    expect(result.current.setLoading).not.toBeUndefined()
  })

  it('should render trigger loading when call setLoading', () => {
    const { result } = renderHook(() => useLoading())

    act(() => {
      result.current.setLoading(true)
    })

    expect(result.current.loading).toBe(true)
  })
})
