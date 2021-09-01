import { renderHook } from '@testing-library/react-hooks'

import createContextWrapper from 'test/utils/createContextWrapper'

import SwapTokenContext from 'modules/swap/stores/contexts/SwapTokenContext'

import * as useSwapTokenContextType from '.'

describe('useSwapTokenContext', () => {
  const { default: useSwapTokenContext } =
    require('.') as typeof useSwapTokenContextType

  it('should return swap token context', () => {
    const { result } = renderHook(() => useSwapTokenContext(), {
      wrapper: createContextWrapper(SwapTokenContext, {
        fromToken: 'BUSD',
        setFromToken: () => {},
        toToken: 'CAKE',
        setToToken: () => {},
      }),
    })

    expect(result.current.fromToken).toBe('BUSD')
    expect(result.current.toToken).toBe('CAKE')
  })
})
