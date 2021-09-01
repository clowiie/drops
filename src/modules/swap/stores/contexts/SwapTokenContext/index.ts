import { createContext } from 'react'

import { ContextType } from './types'

const SwapTokenContext = createContext<ContextType>({
  setFromToken: () => {},
  setToToken: () => {},
})

export default SwapTokenContext
