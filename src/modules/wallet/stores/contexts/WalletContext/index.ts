import { createContext } from 'react'

import { ContextType } from './types'

const WalletContext = createContext<ContextType>({
  walletAddress: '',
})

export default WalletContext
