import { render } from '@testing-library/react'

import { TokenList } from 'modules/token/constants'

import * as WalletBalanceProviderType from '.'

describe('WalletBalanceProvider', () => {
  const useGetWalletBalanceSpy = jest.fn()
  jest.doMock(
    'modules/wallet/hooks/useGetWalletBalance',
    () => useGetWalletBalanceSpy,
  )

  const Component = () => <h1>Component</h1>

  const { default: WalletBalanceProvider } =
    require('.') as typeof WalletBalanceProviderType

  beforeEach(() => {
    useGetWalletBalanceSpy.mockReturnValue(TokenList)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container, getByText } = render(
        <WalletBalanceProvider>
          <Component />
        </WalletBalanceProvider>,
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Component')).toBeDefined()
    })
  })
})
