import React from 'react'

import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as SwapPageType from '.'

describe('SwapPage', () => {
  const loadableSpy = jest.fn()

  jest.doMock('@loadable/component', () => loadableSpy)

  const SwapPageComponent = mockComponent(
    'modules/swap/pages/SwapPage/component',
  )

  it('should render SwapPage correctly', async () => {
    require('.') as typeof SwapPageType

    expect(loadableSpy).toBeCalledTimes(1)

    const loader = loadableSpy.mock.calls[0][0]
    const { default: Component } = await loader()

    render(<Component />)

    expect(SwapPageComponent).toBeCalledTimes(1)
  })
})
