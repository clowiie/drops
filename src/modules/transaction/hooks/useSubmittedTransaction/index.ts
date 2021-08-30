import { useCallback, useState } from 'react'

const useSubmittedTransaction = () => {
  const [submittedHash, setSubmittedHash] = useState('')

  const clearSubmitted = useCallback(() => {
    setSubmittedHash('')
  }, [setSubmittedHash])

  return {
    submittedHash,
    setSubmittedHash,
    clearSubmitted,
  }
}

export default useSubmittedTransaction
