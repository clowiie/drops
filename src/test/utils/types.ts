import { ComponentType, ReactNode } from 'react'

export interface WrapperProps {
  children?: ReactNode
}

export type WrapperType = ComponentType<WrapperProps>
