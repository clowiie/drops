import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as LoadingProviderType from '.'

describe('LoadingProvider', () => {
  const SpinnerOverlaySpy = mockComponent(
    'modules/loading/components/SpinnerOverlay',
  )

  const useLoadingSpy = jest.fn()
  jest.doMock('modules/loading/hooks/useLoading', () => useLoadingSpy)

  const Component = () => <h1>Component</h1>

  const { default: LoadingProvider } =
    require('.') as typeof LoadingProviderType

  beforeEach(() => {
    useLoadingSpy.mockReturnValue({
      loading: false,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should match snapshots with loading', () => {
      useLoadingSpy.mockReturnValue({
        loading: true,
      })

      const { container, getByText } = render(
        <LoadingProvider>
          <Component />
        </LoadingProvider>,
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(SpinnerOverlaySpy).toBeCalledTimes(1)
      expect(getByText('Component')).toBeDefined()
    })

    it('should match snapshots', () => {
      const { container, getByText } = render(
        <LoadingProvider>
          <Component />
        </LoadingProvider>,
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(SpinnerOverlaySpy).not.toBeCalled()
      expect(getByText('Component')).toBeDefined()
    })
  })
})
