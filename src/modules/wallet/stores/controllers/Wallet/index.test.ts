import { CONNECTOR_ID } from 'modules/wallet/stores/controllers/constants'

describe('WalletController', () => {
  const MetaMaskControllerSpy = jest.fn()
  const metaMaskControllerActivateSpy = jest.fn()
  const metaMaskControllerConnectWalletSpy = jest.fn()
  const metaMaskControllerDeactivateSpy = jest.fn()
  jest.doMock(
    'modules/wallet/stores/controllers/MetaMask',
    () => MetaMaskControllerSpy,
  )

  const WalletConnectControllerSpy = jest.fn()
  const walletConnectControllerActivateSpy = jest.fn()
  const walletConnectControllerConnectWalletSpy = jest.fn()
  const walletConnectControllerDeactivateSpy = jest.fn()
  jest.doMock(
    'modules/wallet/stores/controllers/WalletConnect',
    () => WalletConnectControllerSpy,
  )

  beforeEach(() => {
    MetaMaskControllerSpy.mockReturnValue({
      activate: metaMaskControllerActivateSpy,
      connectWallet: metaMaskControllerConnectWalletSpy,
      deactivate: metaMaskControllerDeactivateSpy,
    })

    WalletConnectControllerSpy.mockReturnValue({
      activate: walletConnectControllerActivateSpy,
      connectWallet: walletConnectControllerConnectWalletSpy,
      deactivate: walletConnectControllerDeactivateSpy,
    })
  })

  afterEach(() => {
    localStorage.clear()
    jest.resetAllMocks()
  })

  describe('initSetWallet', () => {
    it('should init set wallet function', async () => {
      const setWalletSpy = jest.fn()

      const { default: WalletController } = await import('.')

      WalletController.initSetWallet(setWalletSpy)

      expect(WalletController.setWallet).toBe(setWalletSpy)
    })
  })

  describe('activate', () => {
    it('should call activate metaMask controller', async () => {
      localStorage.setItem(CONNECTOR_ID, 'metaMask')

      const { default: WalletController } = await import('.')

      await WalletController.activate()

      expect(metaMaskControllerActivateSpy).toBeCalledTimes(1)
    })

    it('should call activate wallet connect controller', async () => {
      localStorage.setItem(CONNECTOR_ID, 'walletConnect')

      const { default: WalletController } = await import('.')

      await WalletController.activate()

      expect(walletConnectControllerActivateSpy).toBeCalledTimes(1)
    })

    it('do nothing if not has connector id', async () => {
      const { default: WalletController } = await import('.')

      await WalletController.activate()

      expect(metaMaskControllerActivateSpy).not.toBeCalled()
      expect(walletConnectControllerActivateSpy).not.toBeCalled()
    })
  })

  describe('connectWallet', () => {
    it('should call connect wallet with metaMask controller', async () => {
      const { default: WalletController } = await import('.')
      const { ConnectorId } = await import('modules/wallet/constants')

      await WalletController.connectWallet(ConnectorId.MetaMask)

      expect(metaMaskControllerConnectWalletSpy).toBeCalledTimes(1)
      expect(localStorage.getItem(CONNECTOR_ID)).toBe(ConnectorId.MetaMask)
    })

    it('should call connect wallet with wallet connect controller', async () => {
      const { default: WalletController } = await import('.')
      const { ConnectorId } = await import('modules/wallet/constants')

      await WalletController.connectWallet(ConnectorId.WalletConnect)

      expect(walletConnectControllerConnectWalletSpy).toBeCalledTimes(1)
      expect(localStorage.getItem(CONNECTOR_ID)).toBe(ConnectorId.WalletConnect)
    })
  })

  describe('deactivate', () => {
    it('should call wallet deactivate and clear wallet', async () => {
      const { default: WalletController } = await import('.')
      const { ConnectorId } = await import('modules/wallet/constants')
      await WalletController.deactivate()

      await WalletController.connectWallet(ConnectorId.MetaMask)

      await WalletController.deactivate()

      expect(metaMaskControllerDeactivateSpy).toBeCalledTimes(1)
      expect(WalletController.wallet).toBe(undefined)
      expect(localStorage.getItem(CONNECTOR_ID)).toBe(null)
    })
  })
})
