import React from 'react'

import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as ConnectWalletModalType from '.'

describe('ConnectWalletModal', () => {
  const loadableSpy = jest.fn()

  jest.doMock('@loadable/component', () => loadableSpy)

  const ConnectWalletModalComponent = mockComponent(
    'modules/wallet/components/ConnectWalletModal/component',
  )

  it('should render ConnectWalletModal correctly', async () => {
    require('.') as typeof ConnectWalletModalType

    expect(loadableSpy).toBeCalledTimes(1)

    const loader = loadableSpy.mock.calls[0][0]
    const { default: Component } = await loader()

    render(<Component />)

    expect(ConnectWalletModalComponent).toBeCalledTimes(1)
  })
})
