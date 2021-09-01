import React from 'react'

import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as SwapPageType from '.'

describe('SwapPage', () => {
  const SwapPlateSpy = mockComponent('modules/swap/components/SwapPlate')

  const { default: SwapPage } = require('.') as typeof SwapPageType

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render swap page', () => {
    const { container, getByText } = render(<SwapPage />)

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText('Swap')).toBeDefined()
    expect(SwapPlateSpy).toBeCalledTimes(1)
  })
})
