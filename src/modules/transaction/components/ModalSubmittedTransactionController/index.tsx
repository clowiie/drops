import React from 'react'

import useSubmittedTransactionContext from 'modules/transaction/hooks/useSubmittedTransactionContext'
import ModalSubmittedTransaction from 'modules/transaction/components/ModalSubmittedTransaction'

const ModalSubmittedTransactionController = () => {
  const { submittedHash } = useSubmittedTransactionContext()

  if (!submittedHash) return null

  return <ModalSubmittedTransaction isOpen={!!submittedHash} />
}

export default ModalSubmittedTransactionController
