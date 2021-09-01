import React from 'react'

import { fireEvent, render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as DisconnectWalletModalType from '.'

describe('DisconnectWalletModal', () => {
  const ModalSpy = mockComponent('common/components/Modal')

  const useDisconnectWalletModalSpy = jest.fn()
  const disconnectWalletSpy = jest.fn()
  jest.doMock(
    'modules/wallet/hooks/useDisconnectWalletModal',
    () => useDisconnectWalletModalSpy,
  )

  const { default: DisconnectWalletModal } =
    require('.') as typeof DisconnectWalletModalType

  beforeEach(() => {
    useDisconnectWalletModalSpy.mockReturnValue({
      disconnectWallet: disconnectWalletSpy,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container, getByText } = render(<DisconnectWalletModal isOpen />)

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Disconnect')).toBeDefined()
      expect(getByText('Logout')).toBeDefined()
      expect(ModalSpy).toBeCalledTimes(1)
    })

    it('should match snapshots with isOpen is false', () => {
      const { container } = render(<DisconnectWalletModal isOpen={false} />)

      expect(container.firstChild).toMatchSnapshot()
      expect(ModalSpy).toBeCalledTimes(1)
    })
  })

  describe('render component', () => {
    it('should call disconnectWallet when press logout button', () => {
      const { getByText } = render(<DisconnectWalletModal isOpen />)

      const button = getByText('Logout')

      fireEvent.click(button)

      expect(disconnectWalletSpy).toBeCalledTimes(1)
    })
  })
})
