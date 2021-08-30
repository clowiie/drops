import { FC } from 'react'

import PendingTransactionContext from 'modules/transaction/stores/contexts/PendingTransactionContext'
import usePendingTransaction from 'modules/transaction/hooks/usePendingTransaction'

const PendingTransactionProvider: FC = ({ children }) => {
  const transaction = usePendingTransaction()

  return (
    <PendingTransactionContext.Provider value={transaction}>
      {children}
    </PendingTransactionContext.Provider>
  )
}

export default PendingTransactionProvider
