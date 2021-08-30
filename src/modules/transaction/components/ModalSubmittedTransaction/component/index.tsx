import React from 'react'

import Modal from 'common/components/Modal'
import useSubmittedTransactionContext from 'modules/transaction/hooks/useSubmittedTransactionContext'
import { BSC_SCAN_URL } from 'modules/transaction/constants'

import { Props } from './types'

const ModalSubmittedTransaction = ({ isOpen }: Props) => {
  const { submittedHash, clearSubmitted } = useSubmittedTransactionContext()

  return (
    <Modal isOpen={isOpen} onClose={clearSubmitted}>
      <div className="p-4 text-center">
        <div>
          <span className="text-xl font-semibold">Transaction Submitted</span>
        </div>

        <div className="mt-4">
          <a
            className="text-sm underline"
            href={`${BSC_SCAN_URL}/tx/${submittedHash}`}
            target="_blank"
            rel="noreferrer"
          >
            View transaction
          </a>
        </div>
      </div>
    </Modal>
  )
}

export default ModalSubmittedTransaction
