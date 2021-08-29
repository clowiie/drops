import React from 'react'

import { render } from '@testing-library/react'

import * as CheckedMarkIconType from '.'

describe('CheckedMarkIcon', () => {
  const { default: CheckedMarkIcon } = require('.') as typeof CheckedMarkIconType

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container } = render(<CheckedMarkIcon size={16} />)

      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
