import { renderHook } from '@testing-library/react-hooks'

import Token from 'common/constants/tokens/bsc'

import * as useComparePriceType from '.'

describe('useComparePrice', () => {
  const formatUnitsSpy = jest.fn()
  const parseUnitsSpy = jest.fn()
  jest.doMock('ethers', () => ({
    ethers: {
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

  const useGetSwapTokenBalanceSpy = jest.fn()
  jest.doMock(
    'modules/swap/hooks/useGetSwapTokenBalance',
    () => useGetSwapTokenBalanceSpy,
  )

  const { default: useComparePrice } =
    require('.') as typeof useComparePriceType

  beforeEach(() => {
    getAmountsOutSpy.mockReturnValue(['1', '10'])
    formatUnitsSpy.mockReturnValue('100')
    parseUnitsSpy.mockReturnValue('1000')

    useGetSwapTokenBalanceSpy.mockReturnValue({
      fromTokenBalance: {
        address: Token.Bunny,
      },
      toTokenBalance: {
        address: Token.Cake,
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return default compare price', async () => {
    const { result } = renderHook(() => useComparePrice())

    expect(result.current).toBeUndefined()
  })

  it('should calculate compare price with happy flow', async () => {
    const { result, waitFor } = renderHook(() => useComparePrice())

    await waitFor(() => {
      expect(parseUnitsSpy).toBeCalledWith('1', 18)
      expect(getAmountsOutSpy).toBeCalledWith('1000', [
        '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
        '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      ])
      expect(formatUnitsSpy).toBeCalledWith('10')
      expect(getAmountsOutSpy).toBeCalledWith('1000', [
        '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      ])
      expect(formatUnitsSpy).toBeCalledWith('10')
      expect(result.current).toBe(1)
    })
  })
})
