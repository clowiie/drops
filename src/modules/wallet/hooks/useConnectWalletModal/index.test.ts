import { renderHook } from '@testing-library/react-hooks'

import { ConnectorId } from 'modules/wallet/constants'

import * as useConnectWalletModalType from '.'

describe('useConnectWalletModal', () => {
  const useHistorySpy = jest.fn()
  const goBackSpy = jest.fn()
  jest.doMock('react-router-dom', () => ({
    useHistory: useHistorySpy,
  }))

  const connectWalletSpy = jest.fn()
  jest.doMock('modules/wallet/stores/controllers/Wallet', () => ({
    connectWallet: connectWalletSpy,
  }))

  const { default: useConnectWalletModal } =
    require('.') as typeof useConnectWalletModalType

  beforeEach(() => {
    useHistorySpy.mockReturnValue({
      goBack: goBackSpy,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call goBack when called closeModal', () => {
    const { result } = renderHook(() => useConnectWalletModal())

    result.current.closeModal()

    expect(goBackSpy).toBeCalledTimes(1)
  })

  it('should call connectWallet and goBack when called connectWallet', async () => {
    const { result } = renderHook(() => useConnectWalletModal())

    await result.current.connectWallet(ConnectorId.MetaMask)

    expect(connectWalletSpy).toBeCalledTimes(1)
    expect(goBackSpy).toBeCalledTimes(1)
  })
})
