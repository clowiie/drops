import React from 'react'

import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as DisconnectWalletModalType from '.'

describe('DisconnectWalletModal', () => {
  const loadableSpy = jest.fn()

  jest.doMock('@loadable/component', () => loadableSpy)

  const DisconnectWalletModalComponent = mockComponent(
    'modules/wallet/components/DisconnectWalletModal/component',
  )

  it('should render DisconnectWalletModal correctly', async () => {
    require('.') as typeof DisconnectWalletModalType

    expect(loadableSpy).toBeCalledTimes(1)

    const loader = loadableSpy.mock.calls[0][0]
    const { default: Component } = await loader()

    render(<Component />)

    expect(DisconnectWalletModalComponent).toBeCalledTimes(1)
  })
})
