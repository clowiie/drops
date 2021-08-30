import React from 'react'

import { render } from '@testing-library/react'

import combineWrappers from 'test/utils/combineWrappers'
import createContextWrapper from 'test/utils/createContextWrapper'
import mockComponent from 'test/utils/mockComponent'

import SubmittedTransactionContext from 'modules/transaction/stores/contexts/SubmittedTransactionContext'

import * as ModalSubmittedTransactionControllerType from '.'

describe('ModalSubmittedTransactionController', () => {
  const ModalSubmittedTransactionSpy = mockComponent(
    'modules/transaction/components/ModalSubmittedTransaction',
  )

  const { default: ModalSubmittedTransactionController } =
    require('.') as typeof ModalSubmittedTransactionControllerType

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('render component', () => {
    it('should render ModalSubmittedTransaction if have submittedHash', () => {
      render(<ModalSubmittedTransactionController />, {
        wrapper: combineWrappers(
          createContextWrapper(SubmittedTransactionContext, {
            submittedHash: 'hash',
            setSubmittedHash: () => {},
            clearSubmitted: () => {},
          }),
        ),
      })

      expect(ModalSubmittedTransactionSpy).toBeCalledWith({ isOpen: true })
    })

    it('should do not render anything if not have submittedHash', () => {
      render(<ModalSubmittedTransactionController />, {
        wrapper: combineWrappers(
          createContextWrapper(SubmittedTransactionContext, {
            submittedHash: '',
            setSubmittedHash: () => {},
            clearSubmitted: () => {},
          }),
        ),
      })

      expect(ModalSubmittedTransactionSpy).not.toBeCalled()
    })
  })
})
