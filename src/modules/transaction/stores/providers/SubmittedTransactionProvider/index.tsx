import { FC } from 'react'

import SubmittedTransactionContext from 'modules/transaction/stores/contexts/SubmittedTransactionContext'
import useSubmittedTransaction from 'modules/transaction/hooks/useSubmittedTransaction'

const SubmittedTransactionProvider: FC = ({ children }) => {
  const transaction = useSubmittedTransaction()

  return (
    <SubmittedTransactionContext.Provider value={transaction}>
      {children}
    </SubmittedTransactionContext.Provider>
  )
}

export default SubmittedTransactionProvider
