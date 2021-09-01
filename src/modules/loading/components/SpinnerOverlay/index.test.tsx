import React from 'react'

import { render } from '@testing-library/react'

import * as SpinnerOverlayType from '.'

describe('SpinnerOverlay', () => {
  const { default: SpinnerOverlay } = require('.') as typeof SpinnerOverlayType

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container } = render(<SpinnerOverlay />)

      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
