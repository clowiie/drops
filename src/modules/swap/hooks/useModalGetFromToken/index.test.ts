import { renderHook } from '@testing-library/react-hooks'

import createContextWrapper from 'test/utils/createContextWrapper'

import SwapTokenContext from 'modules/swap/stores/contexts/SwapTokenContext'

import * as useModalGetFromTokenType from '.'

describe('useModalGetFromToken', () => {
  const useHistorySpy = jest.fn()
  const goBackSpy = jest.fn()
  jest.doMock('react-router-dom', () => ({
    useHistory: useHistorySpy,
  }))

  const { default: useModalGetFromToken } =
    require('.') as typeof useModalGetFromTokenType

  beforeEach(() => {
    useHistorySpy.mockReturnValue({
      goBack: goBackSpy,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call goBack when called closeModal', () => {
    const { result } = renderHook(() => useModalGetFromToken(), {
      wrapper: createContextWrapper(SwapTokenContext, {
        fromToken: 'BUSD',
        setFromToken: () => {},
        setToToken: () => {},
      }),
    })

    result.current.closeModal()

    expect(goBackSpy).toBeCalledTimes(1)
  })

  it('should call setFromToken and goBack when called getToken', () => {
    const setFromTokenSpy = jest.fn()
    const { result } = renderHook(() => useModalGetFromToken(), {
      wrapper: createContextWrapper(SwapTokenContext, {
        setToToken: () => {},
        setFromToken: setFromTokenSpy,
      }),
    })

    result.current.getToken('CAKE')

    expect(setFromTokenSpy).toBeCalledTimes(1)
    expect(goBackSpy).toBeCalledTimes(1)
  })
})
