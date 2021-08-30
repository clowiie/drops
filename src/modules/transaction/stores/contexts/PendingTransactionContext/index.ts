import { createContext } from 'react'

import { ContextType } from './types'

const PendingTransactionContext = createContext<ContextType>({
  pendingHashes: [],
  hasPendingHash: false,
  setPendingHashes: () => {},
})

export default PendingTransactionContext
