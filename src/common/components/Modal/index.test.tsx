import React from 'react'

import { render } from '@testing-library/react'

import createPortalWrapper from 'test/utils/createPortalWrapper'

import * as ModalType from '.'

describe('Modal', () => {
  const onCloseSpy = jest.fn()
  const children = <div>Content</div>

  const { default: ModalComponent } = require('.') as typeof ModalType

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container, getByText } = render(
        <ModalComponent isOpen onClose={onCloseSpy}>
          {children}
        </ModalComponent>,
        {
          wrapper: createPortalWrapper(),
        },
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Content')).toBeDefined()
    })
  })
})
