import { renderHook } from '@testing-library/react-hooks'
import timemachine from 'timemachine'

import createContextWrapper from 'test/utils/createContextWrapper'
import combineWrappers from 'test/utils/combineWrappers'

import { TokenList } from 'modules/token/constants'
import PendingTransactionContext from 'modules/transaction/stores/contexts/PendingTransactionContext'
import WalletContext from 'modules/wallet/stores/contexts/WalletContext'

import * as useGetWalletBalanceType from '.'

describe('useGetWalletBalance', () => {
  const getTokenContractAndBalanceSpy = jest.fn()
  jest.doMock('modules/rpc/stores/controllers/JsonRpc', () => ({
    getTokenContractAndBalance: getTokenContractAndBalanceSpy,
  }))

  const { default: useGetWalletBalance } =
    require('.') as typeof useGetWalletBalanceType

  beforeEach(() => {
    timemachine.config({
      timestamp: 1630333907271,
    })

    getTokenContractAndBalanceSpy.mockImplementation((_, tokenAddress) => Promise.resolve({
      contract: tokenAddress,
      balance: 100,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should get wallet balance and return it', async () => {
    const { result, waitFor } = renderHook(() => useGetWalletBalance(), {
      wrapper: combineWrappers(
        createContextWrapper(PendingTransactionContext, {
          pendingHashes: [],
          hasPendingHash: false,
          setPendingHashes: () => {},
        }),
        createContextWrapper(WalletContext, {
          walletAddress: 'address',
        }),
      ),
    })

    await waitFor(() => {
      expect(getTokenContractAndBalanceSpy).toBeCalledWith(
        'address',
        TokenList.ALPACA.address,
      )
      expect(getTokenContractAndBalanceSpy).toBeCalledWith(
        'address',
        TokenList.BUNNY.address,
      )
      expect(getTokenContractAndBalanceSpy).toBeCalledWith(
        'address',
        TokenList.BUSD.address,
      )
      expect(getTokenContractAndBalanceSpy).toBeCalledWith(
        'address',
        TokenList.CAKE.address,
      )
      expect(getTokenContractAndBalanceSpy).toBeCalledWith(
        'address',
        TokenList.ETH.address,
      )
      expect(result.current).toStrictEqual({
        ALPACA: {
          address: '0x8f0528ce5ef7b51152a59745befdd91d97091d2f',
          name: 'Alpaca',
          symbol: 'ALPACA',
          logo: 'alpaca-logo.png',
          contract: '0x8f0528ce5ef7b51152a59745befdd91d97091d2f',
          balance: 100,
        },
        BUNNY: {
          address: '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
          name: 'Pancake BUNNY',
          symbol: 'BUNNY',
          logo: 'bunny-logo.svg',
          contract: '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
          balance: 100,
        },
        BUSD: {
          address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
          name: 'BUSD Token',
          symbol: 'BUSD',
          logo: 'busd-logo.svg',
          contract: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
          balance: 100,
        },
        CAKE: {
          address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
          name: 'PancakeSwap Token',
          symbol: 'CAKE',
          logo: 'cake-logo.svg',
          contract: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
          balance: 100,
        },
        ETH: {
          address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          name: 'Ethereum Token',
          symbol: 'ETH',
          logo: 'eth-logo.svg',
          contract: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          balance: 100,
        },
      })
    })
  })

  it('should set wallet balance to default if not have wallet address', async () => {
    const { result, waitFor } = renderHook(() => useGetWalletBalance(), {
      wrapper: combineWrappers(
        createContextWrapper(PendingTransactionContext, {
          pendingHashes: [],
          hasPendingHash: false,
          setPendingHashes: () => {},
        }),
        createContextWrapper(WalletContext, {
          walletAddress: '',
        }),
      ),
    })

    await waitFor(() => {
      expect(result.current).toStrictEqual(TokenList)
    })
  })
})
