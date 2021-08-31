import { renderHook } from '@testing-library/react-hooks'

import createContextWrapper from 'test/utils/createContextWrapper'

import SwapTokenContext from 'modules/swap/stores/contexts/SwapTokenContext'

import * as useGetSelectedTokenListType from '.'

describe('useGetSelectedTokenList', () => {
  const { default: useGetSelectedTokenList } =
    require('.') as typeof useGetSelectedTokenListType

  it('should return array swap token', () => {
    const { result } = renderHook(() => useGetSelectedTokenList(), {
      wrapper: createContextWrapper(SwapTokenContext, {
        fromToken: 'BUSD',
        toToken: 'CAKE',
        setFromToken: () => {},
        setToToken: () => {},
      }),
    })

    expect(result.current).toStrictEqual(['BUSD', 'CAKE'])
  })
})
