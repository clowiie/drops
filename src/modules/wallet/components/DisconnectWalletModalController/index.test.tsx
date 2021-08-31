import React from 'react'

import { render } from '@testing-library/react'

import createRouteWrapper from 'test/utils/createRouterWrapper'

import mockComponent from 'test/utils/mockComponent'

import * as DisconnectWalletModalControllerType from '.'

describe('DisconnectWalletModalController', () => {
  const DisconnectWalletModalSpy = mockComponent(
    'modules/wallet/components/DisconnectWalletModal',
  )

  const { default: DisconnectWalletModalController } =
    require('.') as typeof DisconnectWalletModalControllerType

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('render component', () => {
    it('should render DisconnectWalletModal if have modalDisconnectWallet qs', () => {
      render(<DisconnectWalletModalController />, {
        wrapper: createRouteWrapper(
          {
            initialIndex: 0,
            initialEntries: ['/somepath?modalDisconnectWallet=true'],
          },
          {},
        ),
      })

      expect(DisconnectWalletModalSpy).toBeCalledWith({ isOpen: true })
    })

    it('should do not render anything if not have modalDisconnectWallet qs', () => {
      render(<DisconnectWalletModalController />, {
        wrapper: createRouteWrapper(
          {
            initialIndex: 0,
            initialEntries: ['/somepath'],
          },
          {},
        ),
      })

      expect(DisconnectWalletModalSpy).not.toBeCalled()
    })
  })
})
