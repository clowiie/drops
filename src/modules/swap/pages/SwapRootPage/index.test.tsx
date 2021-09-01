import React from 'react'

import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as SwapRootPageType from '.'

describe('SwapRootPage', () => {
  const loadableSpy = jest.fn()

  jest.doMock('@loadable/component', () => loadableSpy)

  const SwapRootPageComponent = mockComponent(
    'modules/swap/pages/SwapRootPage/component',
  )

  it('should render SwapRootPage correctly', async () => {
    require('.') as typeof SwapRootPageType

    expect(loadableSpy).toBeCalledTimes(1)

    const loader = loadableSpy.mock.calls[0][0]
    const { default: Component } = await loader()

    render(<Component />)

    expect(SwapRootPageComponent).toBeCalledTimes(1)
  })
})
