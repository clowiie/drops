import { useCallback } from 'react'
import { ethers } from 'ethers'

import useLoadingContext from 'modules/loading/hooks/useLoadingContext'
import usePendingTransactionContext from 'modules/transaction/hooks/usePendingTransactionContext'
import useSubmittedTransactionContext from 'modules/transaction/hooks/useSubmittedTransactionContext'
import showErrorToast from 'common/utils/showErrorToast'

export default function useHandleSubmitTransaction<Args extends any[]>(
  action: (...args: Args) => Promise<ethers.providers.TransactionResponse>,
) {
  const { setLoading } = useLoadingContext()
  const { pendingHashes, setPendingHashes } = usePendingTransactionContext()
  const { setSubmittedHash } = useSubmittedTransactionContext()

  const actionWithTransactionHandling = useCallback(async (...args: Args) => {
    try {
      setLoading(true)

      const transaction = await action(...args)

      setSubmittedHash(transaction.hash)

      const hashes = [...pendingHashes]
      hashes.push(transaction.hash)
      setPendingHashes(hashes)

      return transaction
    } catch (e) {
      showErrorToast(e)

      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return actionWithTransactionHandling
}
