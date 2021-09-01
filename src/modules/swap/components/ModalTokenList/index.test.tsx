import React from 'react'

import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as ModalTokenListType from '.'

describe('ModalTokenList', () => {
  const loadableSpy = jest.fn()

  jest.doMock('@loadable/component', () => loadableSpy)

  const ModalTokenListComponent = mockComponent(
    'modules/swap/components/ModalTokenList/component',
  )

  it('should render ModalTokenList correctly', async () => {
    require('.') as typeof ModalTokenListType

    expect(loadableSpy).toBeCalledTimes(1)

    const loader = loadableSpy.mock.calls[0][0]
    const { default: Component } = await loader()

    render(<Component />)

    expect(ModalTokenListComponent).toBeCalledTimes(1)
  })
})
