import { useState, useEffect, useCallback } from 'react'

import { ethers } from 'ethers'

import Token from 'common/constants/tokens/bsc'
import useGetSwapTokenBalance from 'modules/swap/hooks/useGetSwapTokenBalance'
import JsonRpcController from 'modules/rpc/stores/controllers/JsonRpc'

let interval: NodeJS.Timeout

const useComparePrice = () => {
  const [comparePrice, setComparePrice] = useState<number>()
  const { fromTokenBalance, toTokenBalance } = useGetSwapTokenBalance()

  const getPrice = useCallback(async () => {
    if (!fromTokenBalance || !toTokenBalance) return null

    const amountsInBigNumber = ethers.utils.parseUnits('1', 18)
    const fromTokenAmounts =
      await JsonRpcController.pancakeRounter.getAmountsOut(amountsInBigNumber, [
        fromTokenBalance.address,
        Token.Wbnb,
      ])

    const fromTokenPerBNB = +ethers.utils.formatUnits(fromTokenAmounts[1])

    const toTokenAmounts = await JsonRpcController.pancakeRounter.getAmountsOut(
      amountsInBigNumber,
      [toTokenBalance.address, Token.Wbnb],
    )

    const toTokenPerBNB = +ethers.utils.formatUnits(toTokenAmounts[1])

    const result = toTokenPerBNB / fromTokenPerBNB

    return result
  }, [fromTokenBalance, toTokenBalance])

  const handleComparePrice = useCallback(async () => {
    const price = await getPrice()

    setComparePrice(price || undefined)
  }, [getPrice, setComparePrice])

  useEffect(() => {
    handleComparePrice()

    interval = setInterval(() => {
      handleComparePrice()
    }, 25000)

    return () => {
      clearInterval(interval)
    }
  }, [fromTokenBalance, toTokenBalance])

  return comparePrice
}

export default useComparePrice
