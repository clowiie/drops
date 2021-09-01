import { renderHook } from '@testing-library/react-hooks'
import timemachine from 'timemachine'

import Token from 'common/constants/tokens/bsc'

import * as useRequestSwapTokenType from '.'

describe('useRequestSwapToken', () => {
  const FakeContract = jest.fn()
  const formatUnitsSpy = jest.fn()
  const parseUnitsSpy = jest.fn()
  const estimateGasSwapExactTokensForTokensSpy = jest.fn()
  const swapExactTokensForTokensSpy = jest.fn()
  jest.doMock('ethers', () => ({
    ethers: {
      Contract: FakeContract,
      utils: {
        formatUnits: formatUnitsSpy,
        parseUnits: parseUnitsSpy,
      },
    },
  }))

  const getAmountsOutSpy = jest.fn()
  jest.doMock('modules/rpc/stores/controllers/JsonRpc', () => ({
    pancakeRounter: {
      getAmountsOut: getAmountsOutSpy,
    },
  }))

  const getSignerSpy = jest.fn()
  jest.doMock('modules/wallet/stores/controllers/Wallet', () => ({
    wallet: {
      getSigner: getSignerSpy,
    },
  }))

  const { default: useRequestSwapToken } =
    require('.') as typeof useRequestSwapTokenType

  beforeEach(() => {
    timemachine.config({
      timestamp: 1630333907271,
    })

    getAmountsOutSpy.mockReturnValue(['1', '10'])
    formatUnitsSpy.mockReturnValue('100')
    parseUnitsSpy.mockReturnValue('1000')
    estimateGasSwapExactTokensForTokensSpy.mockReturnValue('estimateGas')
    FakeContract.mockReturnValue({
      estimateGas: {
        swapExactTokensForTokens: estimateGasSwapExactTokensForTokensSpy,
      },
      swapExactTokensForTokens: swapExactTokensForTokensSpy,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call request swap token', async () => {
    const { result } = renderHook(() => useRequestSwapToken())

    await result.current({
      walletAddress: 'address',
      amountIn: '100',
      token0: Token.Busd,
      token1: Token.Cake,
    })

    expect(parseUnitsSpy).toBeCalledWith('100', 18)
    expect(getAmountsOutSpy).toBeCalledWith('1000', [
      '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    ])
    expect(formatUnitsSpy).toBeCalledWith('10')
    expect(parseUnitsSpy).toBeCalledWith('99.5', 18)
    expect(getSignerSpy).toBeCalledWith()
    expect(estimateGasSwapExactTokensForTokensSpy).toBeCalledWith(
      '1000',
      '1000',
      [
        '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      ],
      'address',
      1630334507,
    )
    expect(parseUnitsSpy).toBeCalledWith('5', 'gwei')
    expect(swapExactTokensForTokensSpy).toBeCalledWith(
      '1000',
      '1000',
      [
        '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      ],
      'address',
      1630334507,
      { gasLimit: 'estimateGas', gasPrice: '1000' },
    )
  })

  it('should use default estimate gas if cannot get estimate gas', async () => {
    estimateGasSwapExactTokensForTokensSpy.mockReturnValue(null)

    const { result } = renderHook(() => useRequestSwapToken())

    await result.current({
      walletAddress: 'address',
      amountIn: '100',
      token0: Token.Busd,
      token1: Token.Cake,
    })

    expect(parseUnitsSpy).toBeCalledWith('100', 18)
    expect(getAmountsOutSpy).toBeCalledWith('1000', [
      '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    ])
    expect(formatUnitsSpy).toBeCalledWith('10')
    expect(parseUnitsSpy).toBeCalledWith('99.5', 18)
    expect(getSignerSpy).toBeCalledWith()
    expect(estimateGasSwapExactTokensForTokensSpy).toBeCalledWith(
      '1000',
      '1000',
      [
        '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      ],
      'address',
      1630334507,
    )
    expect(parseUnitsSpy).toBeCalledWith('5', 'gwei')
    expect(swapExactTokensForTokensSpy).toBeCalledWith(
      '1000',
      '1000',
      [
        '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      ],
      'address',
      1630334507,
      { gasLimit: '150000', gasPrice: '1000' },
    )
  })
})
