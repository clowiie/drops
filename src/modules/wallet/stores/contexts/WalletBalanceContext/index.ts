import { createContext } from 'react'

import { WalletBalance } from 'modules/wallet/types'

const WalletBalanceContext = createContext<Record<string, WalletBalance>>({})

export default WalletBalanceContext
