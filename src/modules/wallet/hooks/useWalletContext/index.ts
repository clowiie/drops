import { useContext } from 'react'

import WalletContext from 'modules/wallet/stores/contexts/WalletContext'

const useWalletContext = () => useContext(WalletContext)

export default useWalletContext
