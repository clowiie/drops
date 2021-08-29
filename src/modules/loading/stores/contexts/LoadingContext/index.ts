import { createContext } from 'react'

import { ContextType } from './types'

const LoadingContext = createContext<ContextType>({
  loading: false,
  setLoading: () => {},
})

export default LoadingContext
