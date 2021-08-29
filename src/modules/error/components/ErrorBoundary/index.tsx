import { Component } from 'react'

import { ErrorBoundaryProps, ErrorBoundaryState } from './types'

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    error: null,
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { children, ErrorHandlerComponent } = this.props

    if (error) {
      return <ErrorHandlerComponent />
    }

    return children
  }
}

export default ErrorBoundary
