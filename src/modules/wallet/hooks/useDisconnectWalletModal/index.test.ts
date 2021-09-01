import { renderHook } from '@testing-library/react-hooks'

import * as useDisconnectWalletModalType from '.'

describe('useDisconnectWalletModal', () => {
  const useHistorySpy = jest.fn()
  const goBackSpy = jest.fn()
  jest.doMock('react-router-dom', () => ({
    useHistory: useHistorySpy,
  }))

  const deactivateSpy = jest.fn()
  jest.doMock('modules/wallet/stores/controllers/Wallet', () => ({
    deactivate: deactivateSpy,
  }))

  const { default: useDisconnectWalletModal } =
    require('.') as typeof useDisconnectWalletModalType

  beforeEach(() => {
    useHistorySpy.mockReturnValue({
      goBack: goBackSpy,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call goBack when called closeModal', () => {
    const { result } = renderHook(() => useDisconnectWalletModal())

    result.current.closeModal()

    expect(goBackSpy).toBeCalledTimes(1)
  })

  it('should call deactivate and goBack when called disconnectWallet', async () => {
    const { result } = renderHook(() => useDisconnectWalletModal())

    await result.current.disconnectWallet()

    expect(deactivateSpy).toBeCalledTimes(1)
    expect(goBackSpy).toBeCalledTimes(1)
  })
})
