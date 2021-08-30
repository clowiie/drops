import { useCallback, useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

import showErrorToast from 'common/utils/showErrorToast'
import showSuccessToast from 'common/utils/showSuccessToast'
import JsonRpcController from 'modules/rpc/stores/controllers/JsonRpc'

let interval: NodeJS.Timeout

const TRANSACTION_SUCCESSED = 'Transaction Successed'
const TRANSACTION_FAILED = 'Transaction Failed'

const usePendingTransaction = () => {
  const [pendingHashes, setPendingHashes] = useState<string[]>([])

  const getTransactionReceipt = useCallback(
    async (hash: string) => {
      const transactionReceipt =
        await JsonRpcController.provider.getTransactionReceipt(hash)

      if (!transactionReceipt) return

      if (transactionReceipt.status) {
        showSuccessToast(TRANSACTION_SUCCESSED)
      } else {
        showErrorToast(TRANSACTION_FAILED)
      }

      const hashes = [...pendingHashes]
      const filterHashes = hashes.filter((h) => h !== hash)

      setPendingHashes(filterHashes)
    },
    [pendingHashes, setPendingHashes],
  )

  const getTransactionReceipts = useCallback(async () => {
    await Promise.all(pendingHashes.map((hash) => getTransactionReceipt(hash)))
  }, [pendingHashes, getTransactionReceipt])

  useEffect(() => {
    if (!isEmpty(pendingHashes)) {
      getTransactionReceipts()

      interval = setInterval(() => {
        getTransactionReceipts()
      }, 3000)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [pendingHashes])

  return {
    pendingHashes,
    hasPendingHash: !isEmpty(pendingHashes),
    setPendingHashes,
  }
}

export default usePendingTransaction
