import { render } from '@testing-library/react'

import * as SwapTokenProviderType from '.'

describe('SwapTokenProvider', () => {
  const Component = () => <h1>Component</h1>

  const { default: SwapTokenProvider } =
    require('.') as typeof SwapTokenProviderType

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container, getByText } = render(
        <SwapTokenProvider>
          <Component />
        </SwapTokenProvider>,
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Component')).toBeDefined()
    })
  })
})
