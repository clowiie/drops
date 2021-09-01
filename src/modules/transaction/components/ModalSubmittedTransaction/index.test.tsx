import React from 'react'

import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as ModalSubmittedTransactionType from '.'

describe('ModalSubmittedTransaction', () => {
  const loadableSpy = jest.fn()

  jest.doMock('@loadable/component', () => loadableSpy)

  const ModalSubmittedTransactionComponent = mockComponent(
    'modules/transaction/components/ModalSubmittedTransaction/component',
  )

  it('should render ModalSubmittedTransaction correctly', async () => {
    require('.') as typeof ModalSubmittedTransactionType

    expect(loadableSpy).toBeCalledTimes(1)

    const loader = loadableSpy.mock.calls[0][0]
    const { default: Component } = await loader()

    render(<Component />)

    expect(ModalSubmittedTransactionComponent).toBeCalledTimes(1)
  })
})
