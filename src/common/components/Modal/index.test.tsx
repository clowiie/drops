import React from 'react'

import { render } from '@testing-library/react'

import * as ModalType from '.'

describe('Modal', () => {
  const onCloseSpy = jest.fn()
  const children = <div>Content</div>

  const { default: Modal } = require('.') as typeof ModalType

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container } = render(
        <Modal isOpen onClose={onCloseSpy}>
          {children}
        </Modal>,
      )

      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
