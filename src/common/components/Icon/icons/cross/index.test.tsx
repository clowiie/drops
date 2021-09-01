import React from 'react'

import { render } from '@testing-library/react'

import * as CrossIconType from '.'

describe('CrossIcon', () => {
  const { default: CrossIcon } = require('.') as typeof CrossIconType

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container } = render(<CrossIcon size={16} />)

      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
