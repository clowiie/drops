import { useMemo } from 'react'

import formatBalance from 'common/utils/formatBalance'

const useGetFormatBalance = (balance = 0) => useMemo(() => {
  if (!balance) return null

  return formatBalance(balance)
}, [balance])

export default useGetFormatBalance
