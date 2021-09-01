import { renderHook } from '@testing-library/react-hooks'

import createContextWrapper from 'test/utils/createContextWrapper'

import LoadingContext from 'modules/loading/stores/contexts/LoadingContext'

import * as useLoadingContextType from '.'

describe('useLoadingContext', () => {
  const mockSetLoading = jest.fn()

  const { default: useLoadingContext } =
    require('.') as typeof useLoadingContextType

  it('should return loading context', () => {
    const { result } = renderHook(() => useLoadingContext(), {
      wrapper: createContextWrapper(LoadingContext, {
        loading: false,
        setLoading: mockSetLoading,
      }),
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.setLoading).not.toBeUndefined()
  })

  it('should render call showErrorToast when error occur', () => {
    const { result } = renderHook(() => useLoadingContext(), {
      wrapper: createContextWrapper(LoadingContext, {
        loading: true,
        setLoading: mockSetLoading,
      }),
    })

    expect(result.current.loading).toBe(true)
    expect(result.current.setLoading).not.toBeUndefined()
  })
})
