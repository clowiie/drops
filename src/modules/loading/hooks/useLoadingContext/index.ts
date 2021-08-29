import { useContext } from 'react'

import LoadingContext from 'modules/loading/stores/contexts/LoadingContext'

const useLoadingContext = () => useContext(LoadingContext)

export default useLoadingContext
