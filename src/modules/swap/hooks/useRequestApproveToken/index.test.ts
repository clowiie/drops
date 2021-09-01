import { renderHook } from '@testing-library/react-hooks'

import Token from 'common/constants/tokens/bsc'

import * as useRequestApproveTokenType from '.'

describe('useRequestApproveToken', () => {
  const FakeContract = jest.fn()
  const parseUnitsSpy = jest.fn()
  const estimateGasApproveSpy = jest.fn()
  const approveSpy = jest.fn()
  jest.doMock('ethers', () => ({
    ethers: {
      Contract: FakeContract,
      utils: {
        parseUnits: parseUnitsSpy,
      },
    },
  }))

  const getSignerSpy = jest.fn()
  jest.doMock('modules/wallet/stores/controllers/Wallet', () => ({
    wallet: {
      getSigner: getSignerSpy,
    },
  }))

  const { default: useRequestApproveToken } =
    require('.') as typeof useRequestApproveTokenType

  beforeEach(() => {
    parseUnitsSpy.mockReturnValue('1000')
    estimateGasApproveSpy.mockReturnValue('estimateGas')
    FakeContract.mockReturnValue({
      estimateGas: {
        approve: estimateGasApproveSpy,
      },
      approve: approveSpy,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call request approve token', async () => {
    const { result } = renderHook(() => useRequestApproveToken())

    await result.current(Token.Busd)

    expect(getSignerSpy).toBeCalledWith()
    expect(estimateGasApproveSpy).toBeCalledWith(
      '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    )
    expect(parseUnitsSpy).toBeCalledWith('5', 'gwei')
    expect(approveSpy).toBeCalledWith(
      '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      { gasLimit: 'estimateGas', gasPrice: '1000' },
    )
  })

  it('should use default estimate gas if cannot get estimate gas', async () => {
    estimateGasApproveSpy.mockReturnValue(null)

    const { result } = renderHook(() => useRequestApproveToken())

    await result.current(Token.Busd)

    expect(getSignerSpy).toBeCalledWith()
    expect(estimateGasApproveSpy).toBeCalledWith(
      '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    )
    expect(parseUnitsSpy).toBeCalledWith('5', 'gwei')
    expect(approveSpy).toBeCalledWith(
      '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      { gasLimit: '150000', gasPrice: '1000' },
    )
  })
})
