import { useContext } from 'react'

import SwapTokenContext from 'modules/swap/stores/contexts/SwapTokenContext'

const useSwapTokenContext = () => useContext(SwapTokenContext)

export default useSwapTokenContext
