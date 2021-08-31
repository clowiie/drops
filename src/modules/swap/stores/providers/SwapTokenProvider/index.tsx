import React, { useState, FC } from 'react'

import SwapTokenContext from 'modules/swap/stores/contexts/SwapTokenContext'

const SwapTokenProvider: FC = ({ children }) => {
  const [fromToken, setFromToken] = useState<string>()
  const [toToken, setToToken] = useState<string>()

  const value = {
    fromToken,
    setFromToken,
    toToken,
    setToToken,
  }

  return (
    <SwapTokenContext.Provider value={value}>
      {children}
    </SwapTokenContext.Provider>
  )
}

export default SwapTokenProvider
