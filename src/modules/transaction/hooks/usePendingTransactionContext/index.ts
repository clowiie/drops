import { useContext } from 'react'

import PendingTransactionContext from 'modules/transaction/stores/contexts/PendingTransactionContext'

const usePendingTransactionContext = () => useContext(PendingTransactionContext)

export default usePendingTransactionContext
