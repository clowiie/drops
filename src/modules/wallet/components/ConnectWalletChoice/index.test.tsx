import React from 'react'

import { fireEvent, render } from '@testing-library/react'

import { ConnectorList } from 'modules/wallet/constants'

import * as ConnectWalletChoiceType from '.'

describe('ConnectWalletChoice', () => {
  const useHandleErrorWithToastSpy = jest.fn()
  jest.doMock(
    'modules/error/hooks/useHandleErrorWithToast',
    () => useHandleErrorWithToastSpy,
  )

  const connectWalletSpy = jest.fn()

  const { default: ConnectWalletChoice } =
    require('.') as typeof ConnectWalletChoiceType

  beforeEach(() => {
    useHandleErrorWithToastSpy.mockImplementation((action) => action)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container } = render(
        <ConnectWalletChoice
          connector={ConnectorList[0]}
          connectWallet={connectWalletSpy}
        />,
      )

      expect(container.firstChild).toMatchSnapshot()
    })
  })

  describe('render component', () => {
    it('should call connectWallet when press component', async () => {
      const { getByText } = render(
        <ConnectWalletChoice
          connector={ConnectorList[0]}
          connectWallet={connectWalletSpy}
        />,
      )

      const button = getByText('MetaMask')

      await fireEvent.click(button)

      expect(useHandleErrorWithToastSpy).toBeCalledWith(connectWalletSpy)
      expect(connectWalletSpy).toBeCalledWith('metaMask')
    })
  })
})
