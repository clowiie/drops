import Contract from 'common/constants/contracts/bsc'
import Token from 'common/constants/tokens/bsc'

import { BSC_RPC_URL, NOT_FOUND_ADDRESS } from 'modules/rpc/constants'

describe('JsonRpcController', () => {
  const mockProvider = 'Provider'
  const FakeJsonRpcProvider = jest.fn()
  const FakeContract = jest.fn()
  const formatUnitsSpy = jest.fn()
  const allowanceSpy = jest.fn()
  const getPairSpy = jest.fn()
  const balanceOfSpy = jest.fn()
  jest.doMock('ethers', () => ({
    ethers: {
      providers: {
        JsonRpcProvider: FakeJsonRpcProvider,
      },
      Contract: FakeContract,
      utils: {
        formatUnits: formatUnitsSpy,
      },
    },
  }))

  beforeEach(() => {
    formatUnitsSpy.mockReturnValue('100')
    allowanceSpy.mockReturnValue(Promise.resolve('100'))
    getPairSpy.mockReturnValue(Promise.resolve('pairAddress'))
    balanceOfSpy.mockReturnValue(Promise.resolve('100'))
    FakeJsonRpcProvider.mockReturnValue(mockProvider)
    FakeContract.mockImplementation((address) => ({
      address,
      allowance: allowanceSpy,
      getPair: getPairSpy,
      balanceOf: balanceOfSpy,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('initController', () => {
    it('should init provider, pancakeFactory, pancakeRounter', async () => {
      const { default: JsonRpcController } = await import('.')

      JsonRpcController.initController()

      expect(FakeJsonRpcProvider).toBeCalledWith(BSC_RPC_URL)
      expect(FakeJsonRpcProvider).toBeCalledTimes(1)
      expect(JsonRpcController.pancakeFactory.address).toBe(
        Contract.Pancake.Factory,
      )
      expect(JsonRpcController.pancakeRounter.address).toBe(
        Contract.Pancake.Router,
      )
      expect(FakeContract).toBeCalledTimes(2)
    })
  })

  describe('checkTokenAmountsApproved', () => {
    it('should return token amount approved', async () => {
      const { default: JsonRpcController } = await import('.')

      JsonRpcController.initController()

      const res = await JsonRpcController.checkTokenAmountsApproved(
        'address',
        Token.Cake,
      )

      expect(res).toBe('100')
    })
  })

  describe('getPairContract', () => {
    it('should return pair contract', async () => {
      const { default: JsonRpcController } = await import('.')

      JsonRpcController.initController()

      const res = await JsonRpcController.getPairContract(
        Token.Busd,
        Token.Cake,
      )

      expect(res?.address).toBe('pairAddress')
    })

    it('should return null if can not find pair contract', async () => {
      getPairSpy.mockReturnValue(Promise.resolve(NOT_FOUND_ADDRESS))

      const { default: JsonRpcController } = await import('.')

      JsonRpcController.initController()

      const res = await JsonRpcController.getPairContract(
        Token.Busd,
        Token.Cake,
      )

      expect(res).toBeNull()
    })
  })

  describe('getTokenContractAndBalance', () => {
    it('should return token contract and balance of wallet address', async () => {
      const { default: JsonRpcController } = await import('.')

      JsonRpcController.initController()

      const res = await JsonRpcController.getTokenContractAndBalance(
        'wallet address',
        Token.Cake,
      )

      expect(res.contract.address).toBe(Token.Cake)
      expect(res.balance).toBe(100)
    })
  })
})
