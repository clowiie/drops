export interface ContextType {
  fromToken?: string
  setFromToken: (token: string) => void
  toToken?: string
  setToToken: (token: string) => void
}
