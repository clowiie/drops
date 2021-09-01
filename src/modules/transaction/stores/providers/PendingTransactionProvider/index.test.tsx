import { render } from '@testing-library/react'

import * as PendingTransactionProviderType from '.'

describe('PendingTransactionProvider', () => {
  const usePendingTransactionSpy = jest.fn()
  jest.doMock(
    'modules/transaction/hooks/usePendingTransaction',
    () => usePendingTransactionSpy,
  )

  const Component = () => <h1>Component</h1>

  const { default: PendingTransactionProvider } =
    require('.') as typeof PendingTransactionProviderType

  beforeEach(() => {
    usePendingTransactionSpy.mockReturnValue({
      pendingHashes: ['hash1', 'hash2'],
      hasPendingHash: true,
      setPendingHashes: () => {},
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container, getByText } = render(
        <PendingTransactionProvider>
          <Component />
        </PendingTransactionProvider>,
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Component')).toBeDefined()
    })
  })
})
