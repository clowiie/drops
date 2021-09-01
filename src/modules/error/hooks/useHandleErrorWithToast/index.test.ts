import { renderHook } from '@testing-library/react-hooks'

import * as useHandleErrorWithToastType from '.'

describe('useHandleErrorWithToast', () => {
  const showErrorToastSpy = jest.fn()
  jest.doMock('common/utils/showErrorToast', () => showErrorToastSpy)

  const mockAction = jest.fn()

  const { default: useHandleErrorWithToast } =
    require('.') as typeof useHandleErrorWithToastType

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render hook correctly', async () => {
    mockAction.mockReturnValue(Promise.resolve('Correctly'))
    const { result } = renderHook(() => useHandleErrorWithToast(mockAction))

    const res = await result.current()

    expect(res).toBe('Correctly')
  })

  it('should render call showErrorToast when error occur', async () => {
    mockAction.mockReturnValue(Promise.reject(new Error('Error')))
    const { result } = renderHook(() => useHandleErrorWithToast(mockAction))

    const res = await result.current()

    expect(res).toBeNull()
    expect(showErrorToastSpy).toBeCalledWith(Error('Error'))
  })
})
