import { render } from '@testing-library/react'

import createContextWrapper from 'test/utils/createContextWrapper'
import mockComponent from 'test/utils/mockComponent'

import Token from 'common/constants/tokens/bsc'
import WalletBalanceContext from 'modules/wallet/stores/contexts/WalletBalanceContext'

import * as SwapTokenListType from '.'

describe('SwapTokenList', () => {
  const useGetSelectedTokenListSpy = jest.fn()
  jest.doMock(
    'modules/swap/hooks/useGetSelectedTokenList',
    () => useGetSelectedTokenListSpy,
  )

  const TokenListItemSpy = mockComponent(
    'modules/token/components/TokenListItem',
  )

  const getTokenSpy = jest.fn()

  const { default: SwapTokenList } = require('.') as typeof SwapTokenListType

  beforeEach(() => {
    useGetSelectedTokenListSpy.mockReturnValue(['BUSD', 'CAKE'])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container } = render(<SwapTokenList getToken={getTokenSpy} />, {
        wrapper: createContextWrapper(WalletBalanceContext, {
          BUSD: {
            address: Token.Busd,
            name: 'BUSD Token',
            symbol: 'BUSD',
            balance: 10,
          },
          BUNNY: {
            address: Token.Bunny,
            name: 'BUNNY Token',
            symbol: 'BUNNY',
            balance: 100,
          },
        }),
      })

      expect(container).toMatchSnapshot()
      expect(TokenListItemSpy).toBeCalledTimes(2)
      expect(TokenListItemSpy).toBeCalledWith({
        disabled: true,
        getToken: getTokenSpy,
        token: {
          address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
          balance: 10,
          name: 'BUSD Token',
          symbol: 'BUSD',
        },
      })
      expect(TokenListItemSpy).toBeCalledWith({
        disabled: false,
        getToken: getTokenSpy,
        token: {
          address: '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
          balance: 100,
          name: 'BUNNY Token',
          symbol: 'BUNNY',
        },
      })
    })
  })
})
