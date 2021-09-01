import { useMemo } from 'react'

import useSwapTokenContext from 'modules/swap/hooks/useSwapTokenContext'

const useGetSelectedTokenList = () => {
  const { fromToken, toToken } = useSwapTokenContext()

  return useMemo(
    () => [fromToken, toToken],
    [fromToken, toToken],
  )
}

export default useGetSelectedTokenList
