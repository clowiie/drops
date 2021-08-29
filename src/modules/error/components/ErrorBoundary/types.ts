import { ComponentType, FC } from 'react'

export interface ErrorHandlerProps {
  error?: Error
}

export interface ErrorBoundaryProps extends FC {
  ErrorHandlerComponent: ComponentType<ErrorHandlerProps>
}

export interface ErrorBoundaryState {
  error: Error | null
}
