import React from 'react'

import { render } from '@testing-library/react'

import * as GlobalErrorType from '.'

describe('GlobalError', () => {
  const { default: GlobalError } = require('.') as typeof GlobalErrorType

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container } = render(<GlobalError />)

      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
