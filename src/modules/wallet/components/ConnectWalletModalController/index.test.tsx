import React from 'react'

import { render } from '@testing-library/react'

import createRouteWrapper from 'test/utils/createRouterWrapper'
import mockComponent from 'test/utils/mockComponent'

import * as ConnectWalletModalControllerType from '.'

describe('ConnectWalletModalController', () => {
  const ConnectWalletModalSpy = mockComponent(
    'modules/wallet/components/ConnectWalletModal',
  )

  const { default: ConnectWalletModalController } =
    require('.') as typeof ConnectWalletModalControllerType

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('render component', () => {
    it('should render ConnectWalletModal if have modalConnectWallet qs', () => {
      render(<ConnectWalletModalController />, {
        wrapper: createRouteWrapper(
          {
            initialIndex: 0,
            initialEntries: ['/somepath?modalConnectWallet=true'],
          },
          {},
        ),
      })

      expect(ConnectWalletModalSpy).toBeCalledWith({ isOpen: true })
    })

    it('should do not render anything if not have modalConnectWallet qs', () => {
      render(<ConnectWalletModalController />, {
        wrapper: createRouteWrapper(
          {
            initialIndex: 0,
            initialEntries: ['/somepath'],
          },
          {},
        ),
      })

      expect(ConnectWalletModalSpy).not.toBeCalled()
    })
  })
})
