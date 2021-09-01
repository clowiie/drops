import { render } from '@testing-library/react'

import createRouteWrapper from 'test/utils/createRouterWrapper'
import combineWrappers from 'test/utils/combineWrappers'
import createContextWrapper from 'test/utils/createContextWrapper'

import WalletContext from 'modules/wallet/stores/contexts/WalletContext'

import * as DisconnectWalletButtonType from '.'

describe('DisconnectWalletButton', () => {
  const { default: DisconnectWalletButton } =
    require('.') as typeof DisconnectWalletButtonType

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container } = render(<DisconnectWalletButton />, {
        wrapper: combineWrappers(
          createContextWrapper(WalletContext, {
            walletAddress: 'address',
          }),
          createRouteWrapper(
            {
              initialIndex: 0,
              initialEntries: ['/somepath'],
            },
            {},
          ),
        ),
      })

      expect(container.firstChild).toMatchSnapshot()
      expect(container.querySelector('a')?.href).toBe(
        'http://localhost/somepath?modalDisconnectWallet=true',
      )
    })

    it('should match snapshots with empty wallet address', () => {
      const { container } = render(<DisconnectWalletButton />, {
        wrapper: combineWrappers(
          createContextWrapper(WalletContext, {
            walletAddress: '',
          }),
          createRouteWrapper(
            {
              initialIndex: 0,
              initialEntries: ['/somepath'],
            },
            {},
          ),
        ),
      })

      expect(container.firstChild).toMatchSnapshot()
      expect(container.querySelector('a')?.href).toBe(
        'http://localhost/somepath?modalDisconnectWallet=true',
      )
    })
  })
})
