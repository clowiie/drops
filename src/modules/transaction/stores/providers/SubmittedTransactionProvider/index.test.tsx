import { render } from '@testing-library/react'

import * as SubmittedTransactionProviderType from '.'

describe('SubmittedTransactionProvider', () => {
  const useSubmittedTransactionSpy = jest.fn()
  jest.doMock(
    'modules/transaction/hooks/useSubmittedTransaction',
    () => useSubmittedTransactionSpy,
  )

  const Component = () => <h1>Component</h1>

  const { default: SubmittedTransactionProvider } =
    require('.') as typeof SubmittedTransactionProviderType

  beforeEach(() => {
    useSubmittedTransactionSpy.mockReturnValue({
      submittedHash: 'hash',
      setSubmittedHash: () => {},
      clearSubmitted: () => {},
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container, getByText } = render(
        <SubmittedTransactionProvider>
          <Component />
        </SubmittedTransactionProvider>,
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Component')).toBeDefined()
    })
  })
})
