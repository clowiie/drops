import React from 'react'

import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as ConnectWalletModalType from '.'

describe('ConnectWalletModal', () => {
  const ModalSpy = mockComponent('common/components/Modal')
  const ConnectWalletChoiceSpy = mockComponent(
    'modules/wallet/components/ConnectWalletChoice',
  )

  const useConnectWalletModalSpy = jest.fn()
  const connectWalletSpy = jest.fn()
  jest.doMock(
    'modules/wallet/hooks/useConnectWalletModal',
    () => useConnectWalletModalSpy,
  )

  const { default: ConnectWalletModal } =
    require('.') as typeof ConnectWalletModalType

  beforeEach(() => {
    useConnectWalletModalSpy.mockReturnValue({
      connectWallet: connectWalletSpy,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container } = render(<ConnectWalletModal isOpen />)

      expect(container.firstChild).toMatchSnapshot()
      expect(ModalSpy).toBeCalledTimes(1)
      expect(ConnectWalletChoiceSpy).toBeCalledTimes(2)
      expect(ConnectWalletChoiceSpy).toBeCalledWith({
        connectWallet: connectWalletSpy,
        connector: {
          connectorId: 'metaMask',
          logo: 'meta-mask-logo.svg',
          name: 'MetaMask',
        },
      })
      expect(ConnectWalletChoiceSpy).toBeCalledWith({
        connectWallet: connectWalletSpy,
        connector: {
          connectorId: 'walletConnect',
          logo: 'wallet-connect-logo.svg',
          name: 'WalletConnect',
        },
      })
    })
  })
})
