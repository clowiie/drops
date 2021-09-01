import { fireEvent, render } from '@testing-library/react'

import combineWrappers from 'test/utils/combineWrappers'
import createContextWrapper from 'test/utils/createContextWrapper'
import createRouteWrapper from 'test/utils/createRouterWrapper'

import Token from 'common/constants/tokens/bsc'
import WalletContext from 'modules/wallet/stores/contexts/WalletContext'

import * as SwapButtonType from '.'

describe('SwapButton', () => {
  const useApproveTokenSpy = jest.fn()
  const onClickApproveSpy = jest.fn()
  jest.doMock('modules/swap/hooks/useApproveToken', () => useApproveTokenSpy)

  const useSwapTokenSpy = jest.fn()
  const onClickSwapSpy = jest.fn()
  jest.doMock('modules/swap/hooks/useSwapToken', () => useSwapTokenSpy)

  const useGetSwapTokenBalanceSpy = jest.fn()
  jest.doMock(
    'modules/swap/hooks/useGetSwapTokenBalance',
    () => useGetSwapTokenBalanceSpy,
  )

  const useHandleSubmitTransactionSpy = jest.fn()
  jest.doMock(
    'modules/transaction/hooks/useHandleSubmitTransaction',
    () => useHandleSubmitTransactionSpy,
  )

  const mockRouterWrapper = createRouteWrapper(
    {
      initialIndex: 0,
      initialEntries: ['/somepath'],
    },
    {},
  )

  const { default: SwapButton } = require('.') as typeof SwapButtonType

  beforeEach(() => {
    useApproveTokenSpy.mockReturnValue({
      isApprovedToken: false,
      onClickApprove: onClickApproveSpy,
    })

    useSwapTokenSpy.mockReturnValue(onClickSwapSpy)

    useGetSwapTokenBalanceSpy.mockReturnValue({
      fromTokenBalance: {
        address: Token.Bunny,
        symbol: 'BUNNY',
        balance: 10,
      },
      toTokenBalance: {
        address: Token.Cake,
      },
    })

    useHandleSubmitTransactionSpy.mockImplementation((action) => action)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should macth snapshots connect wallet modal button', () => {
      const { container, getByText } = render(<SwapButton amountIn={10} />, {
        wrapper: combineWrappers(
          createContextWrapper(WalletContext, {
            walletAddress: '',
          }),
          mockRouterWrapper,
        ),
      })

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Connect Wallet')).toBeDefined()
      expect(container.querySelector('a')?.href).toBe(
        'http://localhost/somepath?modalConnectWallet=true',
      )
    })

    it('should macth snapshots select token button', () => {
      useGetSwapTokenBalanceSpy.mockReturnValue({
        fromTokenBalance: null,
        toTokenBalance: null,
      })

      const { container, getByText } = render(<SwapButton amountIn={10} />, {
        wrapper: combineWrappers(
          createContextWrapper(WalletContext, {
            walletAddress: 'walletAddress',
          }),
          mockRouterWrapper,
        ),
      })

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Select Token')).toBeDefined()
    })

    it('should macth snapshots select token button', () => {
      const { container, getByText } = render(<SwapButton amountIn={0} />, {
        wrapper: combineWrappers(
          createContextWrapper(WalletContext, {
            walletAddress: 'walletAddress',
          }),
          mockRouterWrapper,
        ),
      })

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Enter an amount')).toBeDefined()
    })

    it('should macth snapshots Insufficient balance button', () => {
      const { container, getByText } = render(<SwapButton amountIn={100} />, {
        wrapper: combineWrappers(
          createContextWrapper(WalletContext, {
            walletAddress: 'walletAddress',
          }),
          mockRouterWrapper,
        ),
      })

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Insufficient BUNNY balance')).toBeDefined()
    })

    it('should macth snapshots approve button', () => {
      const { container, getByText } = render(<SwapButton amountIn={10} />, {
        wrapper: combineWrappers(
          createContextWrapper(WalletContext, {
            walletAddress: 'walletAddress',
          }),
          mockRouterWrapper,
        ),
      })

      const button = getByText('Approve')

      fireEvent.click(button)

      expect(container.firstChild).toMatchSnapshot()
      expect(onClickApproveSpy).toBeCalledTimes(1)
    })

    it('should macth snapshots swap button', () => {
      useApproveTokenSpy.mockReturnValue({
        isApprovedToken: true,
        onClickApprove: onClickApproveSpy,
      })

      const { container, getByText } = render(<SwapButton amountIn={10} />, {
        wrapper: combineWrappers(
          createContextWrapper(WalletContext, {
            walletAddress: 'walletAddress',
          }),
          mockRouterWrapper,
        ),
      })

      const button = getByText('Swap')

      fireEvent.click(button)

      expect(container.firstChild).toMatchSnapshot()
      expect(onClickSwapSpy).toBeCalledTimes(1)
    })
  })
})
