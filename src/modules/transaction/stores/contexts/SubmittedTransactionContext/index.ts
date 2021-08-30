import { createContext } from 'react'

import { ContextType } from './types'

const SubmittedTransactionContext = createContext<ContextType>({
  submittedHash: '',
  setSubmittedHash: () => {},
  clearSubmitted: () => {},
})

export default SubmittedTransactionContext
