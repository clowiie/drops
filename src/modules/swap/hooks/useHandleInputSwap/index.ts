import { useState, useEffect, ChangeEvent } from 'react'

import { InputSwapToken } from 'modules/swap/constants'

const useHandleInputSwap = (comparePrice?: number) => {
  const [amountIn, setAmountIn] = useState<string>('')
  const [amountOut, setAmountOut] = useState<string>('')
  const [estimate, setEstimate] = useState<InputSwapToken>(InputSwapToken.Out)

  const onChangeAmountIn = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountIn(e.target.value)
    setEstimate(InputSwapToken.Out)
  }

  const onChangeAmountOut = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountOut(e.target.value)
    setEstimate(InputSwapToken.In)
  }

  useEffect(() => {
    if (comparePrice) {
      if (estimate === InputSwapToken.Out) {
        const calAmountOut = +amountIn / comparePrice
        setAmountOut(`${calAmountOut}`)
      } else {
        const calAmountIn = +amountOut * comparePrice
        setAmountIn(`${calAmountIn}`)
      }
    }
  }, [amountIn, amountOut, estimate, comparePrice])

  return {
    amountIn,
    amountOut,
    estimate,
    onChangeAmountIn,
    onChangeAmountOut,
  }
}

export default useHandleInputSwap
