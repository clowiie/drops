import React from 'react'

import { render } from '@testing-library/react'

import * as SpinnerType from '.'

describe('Spinner', () => {
  const { default: Spinner } = require('.') as typeof SpinnerType

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container } = render(<Spinner />)

      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
