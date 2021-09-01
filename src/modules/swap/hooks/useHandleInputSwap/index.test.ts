import { ChangeEvent } from 'react'

import { act, renderHook } from '@testing-library/react-hooks'

import * as useHandleInputSwapType from '.'

describe('useHandleInputSwap', () => {
  const { default: useHandleInputSwap } =
    require('.') as typeof useHandleInputSwapType

  it('should return default state', () => {
    const { result } = renderHook(() => useHandleInputSwap())

    expect(result.current.amountIn).toBe('')
    expect(result.current.amountOut).toBe('')
    expect(result.current.estimate).toBe('out')
  })

  it('should calculate estimate price to amount out', () => {
    const { result } = renderHook(() => useHandleInputSwap(100))

    act(() => {
      result.current.onChangeAmountIn({
        target: { value: '10' },
      } as ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.amountIn).toBe('10')
    expect(result.current.amountOut).toBe('0.1')
    expect(result.current.estimate).toBe('out')
  })

  it('should calculate estimate price to amount in', () => {
    const { result } = renderHook(() => useHandleInputSwap(0.1))

    act(() => {
      result.current.onChangeAmountOut({
        target: { value: '10' },
      } as ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.amountIn).toBe('1')
    expect(result.current.amountOut).toBe('10')
    expect(result.current.estimate).toBe('in')
  })
})
