import Chains from 'common/constants/chains'
import { CONNECTOR_ID } from 'modules/wallet/stores/controllers/constants'

import * as MetaMaskControllerType from '.'

describe('MetaMaskController', () => {
  const windowEthereumOnSpy = jest.fn()
  const windowEthereumRemoveListenerSpy = jest.fn()
  Object.defineProperty(window, 'ethereum', {
    value: {
      on: windowEthereumOnSpy,
      removeListener: windowEthereumRemoveListenerSpy,
    },
  })

  const FakeWeb3Provider = jest.fn()
  const sendSpy = jest.fn()
  const getSignerSpy = jest.fn()
  const getNetworkSpy = jest.fn()
  const getAddressSpy = jest.fn()
  jest.doMock('ethers', () => ({
    ethers: {
      providers: {
        Web3Provider: FakeWeb3Provider,
      },
    },
  }))

  const setWalletSpy = jest.fn()
  jest.doMock('modules/wallet/stores/controllers/Wallet', () => ({
    setWallet: setWalletSpy,
  }))

  const { default: MetaMaskController } =
    require('.') as typeof MetaMaskControllerType

  beforeEach(() => {
    sendSpy.mockReturnValue(Promise.resolve())
    getAddressSpy.mockReturnValue('address')
    getSignerSpy.mockReturnValue({
      getAddress: getAddressSpy,
    })
    FakeWeb3Provider.mockReturnValue({
      send: sendSpy,
      getSigner: getSignerSpy,
      getNetwork: getNetworkSpy,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('handleChainChange', () => {
    it('should set wallet to wallet address if chain changed to BNB network', async () => {
      const controller = new MetaMaskController()

      await controller.handleChainChange('0x38')

      expect(sendSpy).toBeCalledWith('eth_requestAccounts', [])
      expect(getSignerSpy).toBeCalledTimes(1)
      expect(getAddressSpy).toBeCalledTimes(1)
      expect(setWalletSpy).toBeCalledWith('address')
    })

    it('should set wallet to empty if chain changed to another network', async () => {
      const controller = new MetaMaskController()

      await controller.handleChainChange('0x40')

      expect(setWalletSpy).toBeCalledWith('')
    })
  })

  describe('handleAccountChange', () => {
    it('should set wallet to wallet address if has account', () => {
      const controller = new MetaMaskController()

      controller.handleAccountChange(['address'])

      expect(setWalletSpy).toBeCalledWith('address')
    })

    it('should call deactivate if accounts is empty', () => {
      const controller = new MetaMaskController()

      controller.handleAccountChange([])

      expect(windowEthereumRemoveListenerSpy.mock.calls[0][0]).toBe(
        'chainChanged',
      )
      expect(windowEthereumRemoveListenerSpy.mock.calls[1][0]).toBe(
        'accountsChanged',
      )
      expect(setWalletSpy).toBeCalledWith(undefined)
    })
  })

  describe('addListener', () => {
    it('should set window ethereum event listener', () => {
      const controller = new MetaMaskController()

      controller.addListener()

      expect(windowEthereumOnSpy.mock.calls[0][0]).toBe('chainChanged')
      expect(windowEthereumOnSpy.mock.calls[1][0]).toBe('accountsChanged')
    })
  })

  describe('getSigner', () => {
    it('should call getSigner and return signer', () => {
      const controller = new MetaMaskController()

      controller.getSigner()

      expect(getSignerSpy).toBeCalledTimes(1)
    })
  })

  describe('getAddress', () => {
    it('should call getAddress and return address', async () => {
      const controller = new MetaMaskController()

      const address = await controller.getAddress()

      expect(sendSpy).toBeCalledWith('eth_requestAccounts', [])
      expect(getSignerSpy).toBeCalledTimes(1)
      expect(getAddressSpy).toBeCalledTimes(1)
      expect(address).toBe('address')
    })
  })

  describe('validatePermissions', () => {
    it('should true if provider has permission', async () => {
      sendSpy.mockReturnValue(Promise.resolve(['address']))
      const controller = new MetaMaskController()

      const res = await controller.validatePermissions()

      expect(sendSpy).toBeCalledWith('wallet_getPermissions', [])
      expect(res).toBe(true)
    })

    it('should false if provider not has permission', async () => {
      sendSpy.mockReturnValue(Promise.resolve([]))
      const controller = new MetaMaskController()

      const res = await controller.validatePermissions()

      expect(sendSpy).toBeCalledWith('wallet_getPermissions', [])
      expect(res).toBe(false)
    })
  })

  describe('requestChangeNetWork', () => {
    it('should do nothing if current network is BNB network', async () => {
      getNetworkSpy.mockReturnValue(Promise.resolve(Chains.BNB))
      const controller = new MetaMaskController()

      await controller.requestChangeNetWork()

      expect(getNetworkSpy).toBeCalledTimes(1)
      expect(sendSpy).not.toBeCalled()
    })

    it('should request change network to BNB', async () => {
      getNetworkSpy.mockReturnValue(
        Promise.resolve({
          name: 'bnbt',
          chainId: 97,
        }),
      )

      const controller = new MetaMaskController()

      await controller.requestChangeNetWork()

      expect(getNetworkSpy).toBeCalledTimes(1)
      expect(sendSpy).toBeCalledWith('wallet_switchEthereumChain', [
        {
          chainId: '0x38',
        },
      ])
    })
  })

  describe('setWallet', () => {
    it('should call setWallet', async () => {
      const controller = new MetaMaskController()

      await controller.setWallet()

      expect(sendSpy).toBeCalledWith('eth_requestAccounts', [])
      expect(getSignerSpy).toBeCalledTimes(1)
      expect(getAddressSpy).toBeCalledTimes(1)
      expect(setWalletSpy).toBeCalledWith('address')
    })
  })

  describe('connectWallet', () => {
    it('should call get permission and validate network before set wallet', async () => {
      getNetworkSpy.mockReturnValue(Promise.resolve(Chains.BNB))
      const controller = new MetaMaskController()

      await controller.connectWallet()

      expect(sendSpy).toBeCalledWith('eth_requestAccounts', [])
      expect(getSignerSpy).toBeCalledTimes(1)
      expect(getAddressSpy).toBeCalledTimes(1)
      expect(getNetworkSpy).toBeCalledTimes(1)
      expect(setWalletSpy).toBeCalledWith('address')
      expect(windowEthereumOnSpy.mock.calls[0][0]).toBe('chainChanged')
      expect(windowEthereumOnSpy.mock.calls[1][0]).toBe('accountsChanged')
    })
  })

  describe('activate', () => {
    it('should call get validate and network before set wallet with has permission', async () => {
      sendSpy.mockReturnValue(Promise.resolve(['address']))
      getNetworkSpy.mockReturnValue(Promise.resolve(Chains.BNB))
      const controller = new MetaMaskController()

      await controller.activate()

      expect(sendSpy).toBeCalledWith('wallet_getPermissions', [])
      expect(getNetworkSpy).toBeCalledTimes(1)
      expect(getSignerSpy).toBeCalledTimes(1)
      expect(getAddressSpy).toBeCalledTimes(1)
      expect(setWalletSpy).toBeCalledWith('address')
      expect(windowEthereumOnSpy.mock.calls[0][0]).toBe('chainChanged')
      expect(windowEthereumOnSpy.mock.calls[1][0]).toBe('accountsChanged')
    })

    it('should call get validate and network before set wallet with not has permission', async () => {
      localStorage.setItem(CONNECTOR_ID, 'metaMask')

      sendSpy.mockReturnValue(Promise.resolve([]))
      getNetworkSpy.mockReturnValue(Promise.resolve(Chains.BNB))
      const controller = new MetaMaskController()

      expect(localStorage.getItem(CONNECTOR_ID)).toBe('metaMask')

      await controller.activate()

      expect(sendSpy).toBeCalledWith('wallet_getPermissions', [])
      expect(localStorage.getItem(CONNECTOR_ID)).toBe(null)
    })
  })

  describe('deactivate', () => {
    it('should clear event listener', () => {
      const controller = new MetaMaskController()

      controller.deactivate()

      expect(windowEthereumRemoveListenerSpy.mock.calls[0][0]).toBe(
        'chainChanged',
      )
      expect(windowEthereumRemoveListenerSpy.mock.calls[1][0]).toBe(
        'accountsChanged',
      )
    })
  })
})
