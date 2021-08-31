import { CONNECTOR_ID } from 'modules/wallet/stores/controllers/constants'

import * as WalletConnectControllerType from '.'

describe('WalletConnectController', () => {
  const FakeWeb3Provider = jest.fn()
  const getSignerSpy = jest.fn()
  jest.doMock('ethers', () => ({
    ethers: {
      providers: {
        Web3Provider: FakeWeb3Provider,
      },
    },
  }))

  const WalletConnectProviderSpy = jest.fn()
  const walletConnectOnSpy = jest.fn()
  const walletConnectRemoveListenerSpy = jest.fn()
  const walletConnectEnableSpy = jest.fn()
  const walletConnectDisconnectSpy = jest.fn()
  jest.doMock('@walletconnect/web3-provider', () => WalletConnectProviderSpy)

  const setWalletSpy = jest.fn()
  jest.doMock('modules/wallet/stores/controllers/Wallet', () => ({
    setWallet: setWalletSpy,
  }))

  const { default: WalletConnectController } =
    require('.') as typeof WalletConnectControllerType

  beforeEach(() => {
    walletConnectEnableSpy.mockReturnValue(['address'])
    WalletConnectProviderSpy.mockReturnValue({
      on: walletConnectOnSpy,
      enable: walletConnectEnableSpy,
      connected: true,
      accounts: ['address'],
      removeListener: walletConnectRemoveListenerSpy,
      disconnect: walletConnectDisconnectSpy,
    })
    FakeWeb3Provider.mockReturnValue({
      getSigner: getSignerSpy,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('init controller', () => {
    it('should set walletConnector and provider', () => {
      const controller = new WalletConnectController()

      expect(controller.walletConnector).toStrictEqual({
        on: walletConnectOnSpy,
        enable: walletConnectEnableSpy,
        connected: true,
        accounts: ['address'],
        removeListener: walletConnectRemoveListenerSpy,
        disconnect: walletConnectDisconnectSpy,
      })
      expect(controller.provider).toStrictEqual({
        getSigner: getSignerSpy,
      })
    })
  })

  describe('addListener', () => {
    it('should set window ethereum event listener', () => {
      const controller = new WalletConnectController()

      controller.addListener()

      expect(walletConnectOnSpy.mock.calls[0][0]).toBe('chainChanged')
      expect(walletConnectOnSpy.mock.calls[1][0]).toBe('accountsChanged')
      expect(walletConnectOnSpy.mock.calls[2][0]).toBe('disconnect')
    })
  })

  describe('getSigner', () => {
    it('should call getSigner and return signer', () => {
      const controller = new WalletConnectController()

      controller.getSigner()

      expect(getSignerSpy).toBeCalledTimes(1)
    })
  })

  describe('connectWallet', () => {
    it('should show qr code for connect wallet', async () => {
      const controller = new WalletConnectController()

      await controller.connectWallet()

      expect(walletConnectEnableSpy).toBeCalledTimes(1)
      expect(setWalletSpy).toBeCalledWith('address')
      expect(walletConnectOnSpy.mock.calls[0][0]).toBe('chainChanged')
      expect(walletConnectOnSpy.mock.calls[1][0]).toBe('accountsChanged')
      expect(walletConnectOnSpy.mock.calls[2][0]).toBe('disconnect')
    })
  })

  describe('activate', () => {
    it('should call enable before set wallet if connected', async () => {
      const controller = new WalletConnectController()

      await controller.activate()

      expect(walletConnectEnableSpy).toBeCalledTimes(1)
      expect(setWalletSpy).toBeCalledWith('address')
      expect(walletConnectOnSpy.mock.calls[0][0]).toBe('chainChanged')
      expect(walletConnectOnSpy.mock.calls[1][0]).toBe('accountsChanged')
      expect(walletConnectOnSpy.mock.calls[2][0]).toBe('disconnect')
    })

    it('should call enable and return if connected is false', async () => {
      localStorage.setItem(CONNECTOR_ID, 'walletConnect')

      WalletConnectProviderSpy.mockReturnValue({
        on: walletConnectOnSpy,
        enable: walletConnectEnableSpy,
        connected: false,
        accounts: [],
        removeListener: walletConnectRemoveListenerSpy,
        disconnect: walletConnectDisconnectSpy,
      })

      const controller = new WalletConnectController()

      expect(localStorage.getItem(CONNECTOR_ID)).toBe('walletConnect')

      await controller.activate()

      expect(walletConnectEnableSpy).toBeCalledTimes(1)
      expect(localStorage.getItem(CONNECTOR_ID)).toBe(null)
    })
  })

  describe('deactivate', () => {
    it('should clear event listener', () => {
      const controller = new WalletConnectController()

      controller.deactivate()

      expect(walletConnectRemoveListenerSpy.mock.calls[0][0]).toBe(
        'chainChanged',
      )
      expect(walletConnectRemoveListenerSpy.mock.calls[1][0]).toBe(
        'accountsChanged',
      )
      expect(walletConnectRemoveListenerSpy.mock.calls[2][0]).toBe('disconnect')
      expect(walletConnectDisconnectSpy).toBeCalledTimes(1)
    })
  })
})
