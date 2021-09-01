import React from 'react'

import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'
import createContextWrapper from 'test/utils/createContextWrapper'

import WalletContext from 'modules/wallet/stores/contexts/WalletContext'

import * as TopBarType from '.'

describe('TopBar', () => {
  const ConnectWalletButtonSpy = mockComponent('modules/wallet/components/ConnectWalletButton')
  const DisconnectWalletButtonSpy = mockComponent('modules/wallet/components/DisconnectWalletButton')

  const { default: TopBar } = require('.') as typeof TopBarType

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should match snapshots with connected wallet', () => {
      const { container } = render(<TopBar />, {
        wrapper: createContextWrapper(WalletContext, { walletAddress: '123456' }),
      })

      expect(container.firstChild).toMatchSnapshot()
      expect(DisconnectWalletButtonSpy).toBeCalledTimes(1)
    })

    it('should match snapshots does not connect wallet', () => {
      const { container } = render(<TopBar />, {
        wrapper: createContextWrapper(WalletContext, { walletAddress: '' }),
      })

      expect(container.firstChild).toMatchSnapshot()
      expect(ConnectWalletButtonSpy).toBeCalledTimes(1)
    })
  })
})
