import { useContext } from 'react'

import WalletBalanceContext from 'modules/wallet/stores/contexts/WalletBalanceContext'

const useWalletBalanceContext = () => useContext(WalletBalanceContext)

export default useWalletBalanceContext
