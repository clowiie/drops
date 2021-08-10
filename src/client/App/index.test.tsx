import { render } from '@testing-library/react'
import * as AppType from '.'

describe('renders learn react link', () => {
  const { default: App } = require('.') as typeof AppType

  it('should render App', () => {
    const { getByText } = render(<App />)

    expect(getByText('Drops'))
  })
})
