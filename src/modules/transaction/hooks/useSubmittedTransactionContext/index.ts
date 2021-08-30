import { useContext } from 'react'

import SubmittedTransactionContext from 'modules/transaction/stores/contexts/SubmittedTransactionContext'

const useSubmittedTransactionContext = () => useContext(SubmittedTransactionContext)

export default useSubmittedTransactionContext
