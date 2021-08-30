import { renderHook } from '@testing-library/react-hooks'

import combineWrappers from 'test/utils/combineWrappers'
import createContextWrapper from 'test/utils/createContextWrapper'

import LoadingContext from 'modules/loading/stores/contexts/LoadingContext'
import PendingTransactionContext from 'modules/transaction/stores/contexts/PendingTransactionContext'
import SubmittedTransactionContext from 'modules/transaction/stores/contexts/SubmittedTransactionContext'

import * as useHandleSubmitTransactionType from '.'

describe('useHandleSubmitTransaction', () => {
  const showErrorToastSpy = jest.fn()
  jest.doMock('common/utils/showErrorToast', () => showErrorToastSpy)

  const setLoadingSpy = jest.fn()
  const setPendingHashesSpy = jest.fn()
  const setSubmittedHashSpy = jest.fn()
  const clearSubmittedSpy = jest.fn()

  const mockAction = jest.fn()

  const { default: useHandleSubmitTransaction } =
    require('.') as typeof useHandleSubmitTransactionType

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render hook correctly', async () => {
    mockAction.mockReturnValue(Promise.resolve({ hash: 'hash' }))
    const { result } = renderHook(
      () => useHandleSubmitTransaction(mockAction),
      {
        wrapper: combineWrappers(
          createContextWrapper(SubmittedTransactionContext, {
            submittedHash: '',
            setSubmittedHash: setSubmittedHashSpy,
            clearSubmitted: clearSubmittedSpy,
          }),
          createContextWrapper(PendingTransactionContext, {
            pendingHashes: [],
            hasPendingHash: false,
            setPendingHashes: setPendingHashesSpy,
          }),
          createContextWrapper(LoadingContext, {
            loading: false,
            setLoading: setLoadingSpy,
          }),
        ),
      },
    )

    const res = await result.current()

    expect(setLoadingSpy).toBeCalledWith(true)
    expect(res).toStrictEqual({ hash: 'hash' })
    expect(setSubmittedHashSpy).toBeCalledWith('hash')
    expect(setPendingHashesSpy).toBeCalledWith(['hash'])
    expect(setLoadingSpy).toBeCalledWith(false)
  })

  it('should render call showErrorToast when error occur', async () => {
    mockAction.mockReturnValue(Promise.reject(new Error('Error')))
    const { result } = renderHook(() => useHandleSubmitTransaction(mockAction), {
      wrapper: createContextWrapper(LoadingContext, {
        loading: false,
        setLoading: setLoadingSpy,
      }),
    })

    const res = await result.current()

    expect(setLoadingSpy).toBeCalledWith(true)
    expect(res).toBeNull()
    expect(showErrorToastSpy).toBeCalledWith(Error('Error'))
    expect(setLoadingSpy).toBeCalledWith(false)
  })
})
