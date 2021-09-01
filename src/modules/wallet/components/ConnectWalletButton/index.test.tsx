import { render } from '@testing-library/react'

import createRouteWrapper from 'test/utils/createRouterWrapper'

import * as ConnectWalletButtonType from '.'

describe('ConnectWalletButton', () => {
  const { default: ConnectWalletButton } =
    require('.') as typeof ConnectWalletButtonType

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container } = render(<ConnectWalletButton />, {
        wrapper: createRouteWrapper(
          {
            initialIndex: 0,
            initialEntries: ['/somepath'],
          },
          {},
        ),
      })

      expect(container.firstChild).toMatchSnapshot()
      expect(container.querySelector('a')?.href).toBe(
        'http://localhost/somepath?modalConnectWallet=true',
      )
    })
  })
})
