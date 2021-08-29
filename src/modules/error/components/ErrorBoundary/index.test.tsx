import { useMemo } from 'react'

import { render } from '@testing-library/react'

import * as ErrorBoundaryType from '.'

describe('ErrorBoundary', () => {
  const ErrorHandlerComponent = () => <h1>Handled Bug</h1>

  const HappyComponent = () => <h1>Happy Component</h1>

  const BugComponent = () => {
    useMemo(() => {
      throw new Error('Bug')
    }, [])

    return <h1>Bug Component</h1>
  }

  const { default: ErrorBoundary } = require('.') as typeof ErrorBoundaryType

  describe('render component', () => {
    it('should render component properly if nothing error', () => {
      const { getByText } = render(
        <ErrorBoundary ErrorHandlerComponent={ErrorHandlerComponent}>
          <HappyComponent />
        </ErrorBoundary>,
      )

      expect(getByText('Happy Component')).toBeDefined()
    })

    it('should render error component when error occur', () => {
      const { getByText } = render(
        <ErrorBoundary ErrorHandlerComponent={ErrorHandlerComponent}>
          <BugComponent />
        </ErrorBoundary>,
      )

      expect(getByText('Handled Bug')).toBeDefined()
    })
  })
})
