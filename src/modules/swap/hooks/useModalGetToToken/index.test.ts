import { renderHook } from '@testing-library/react-hooks'

import createContextWrapper from 'test/utils/createContextWrapper'

import SwapTokenContext from 'modules/swap/stores/contexts/SwapTokenContext'

import * as useModalGetToTokenType from '.'

describe('useModalGetToToken', () => {
  const useHistorySpy = jest.fn()
  const goBackSpy = jest.fn()
  jest.doMock('react-router-dom', () => ({
    useHistory: useHistorySpy,
  }))

  const { default: useModalGetToToken } =
    require('.') as typeof useModalGetToTokenType

  beforeEach(() => {
    useHistorySpy.mockReturnValue({
      goBack: goBackSpy,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call goBack when called closeModal', () => {
    const { result } = renderHook(() => useModalGetToToken(), {
      wrapper: createContextWrapper(SwapTokenContext, {
        fromToken: 'BUSD',
        setFromToken: () => {},
        setToToken: () => {},
      }),
    })

    result.current.closeModal()

    expect(goBackSpy).toBeCalledTimes(1)
  })

  it('should call setToToken and goBack when called getToken', () => {
    const setToTokenSpy = jest.fn()
    const { result } = renderHook(() => useModalGetToToken(), {
      wrapper: createContextWrapper(SwapTokenContext, {
        setFromToken: () => {},
        setToToken: setToTokenSpy,
      }),
    })

    result.current.getToken('CAKE')

    expect(setToTokenSpy).toBeCalledTimes(1)
    expect(goBackSpy).toBeCalledTimes(1)
  })
})
