import { renderHook } from '@testing-library/react-hooks'

import * as useGetFormatBalanceType from '.'

describe('useGetFormatBalance', () => {
  const { default: useGetFormatBalance } =
    require('.') as typeof useGetFormatBalanceType

  it('should return format balance', () => {
    const { result } = renderHook(() => useGetFormatBalance(0.0001234))

    expect(result.current).toBe(0.000123)
  })

  it('should return null if not have balance', () => {
    const { result } = renderHook(() => useGetFormatBalance())

    expect(result.current).toBe(null)
  })
})
