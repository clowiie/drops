import { ChangeEvent } from 'react'

export interface Props {
  title: string
  to: string
  tokenSymbol?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
