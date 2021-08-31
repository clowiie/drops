import { render } from '@testing-library/react'

import * as WalletProviderType from '.'

describe('WalletProvider', () => {
  const useInitWalletSpy = jest.fn()
  jest.doMock('modules/wallet/hooks/useInitWallet', () => useInitWalletSpy)

  const Component = () => <h1>Component</h1>

  const { default: WalletProvider } = require('.') as typeof WalletProviderType

  beforeEach(() => {
    useInitWalletSpy.mockReturnValue({
      walletAddress: 'address',
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container, getByText } = render(
        <WalletProvider>
          <Component />
        </WalletProvider>,
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Component')).toBeDefined()
    })
  })
})
