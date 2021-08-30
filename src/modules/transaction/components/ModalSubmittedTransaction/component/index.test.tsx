import React from 'react'

import { render } from '@testing-library/react'

import combineWrappers from 'test/utils/combineWrappers'
import createContextWrapper from 'test/utils/createContextWrapper'
import createPortalWrapper from 'test/utils/createPortalWrapper'
import mockComponent from 'test/utils/mockComponent'

import SubmittedTransactionContext from 'modules/transaction/stores/contexts/SubmittedTransactionContext'

import * as ModalSubmittedTransactionType from '.'

describe('ModalSubmittedTransaction', () => {
  const ModalSpy = mockComponent('common/components/Modal')

  const clearSubmittedSpy = jest.fn()

  const { default: ModalSubmittedTransaction } =
    require('.') as typeof ModalSubmittedTransactionType

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container, getByText } = render(
        <ModalSubmittedTransaction isOpen />,
        {
          wrapper: combineWrappers(
            createContextWrapper(SubmittedTransactionContext, {
              submittedHash: 'hash',
              setSubmittedHash: () => {},
              clearSubmitted: clearSubmittedSpy,
            }),
            createPortalWrapper(),
          ),
        },
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Transaction Submitted')).toBeDefined()
      expect(getByText('View transaction')).toBeDefined()
      expect(getByText('View transaction').hasAttribute('href')).toBe(true)
      expect(ModalSpy).toBeCalledTimes(1)
    })

    it('should match snapshots with isOpen is false', () => {
      const { container } = render(
        <ModalSubmittedTransaction isOpen={false} />,
        {
          wrapper: combineWrappers(
            createContextWrapper(SubmittedTransactionContext, {
              submittedHash: 'hash',
              setSubmittedHash: () => {},
              clearSubmitted: clearSubmittedSpy,
            }),
            createPortalWrapper(),
          ),
        },
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(ModalSpy).toBeCalledTimes(1)
    })
  })
})
