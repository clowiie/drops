import { FC } from 'react'

import SpinnerOverlay from 'modules/loading/components/SpinnerOverlay'
import useLoading from 'modules/loading/hooks/useLoading'
import LoadingContext from 'modules/loading/stores/contexts/LoadingContext'

const LoadingProvider: FC = ({ children }) => {
  const { loading, setLoading } = useLoading()

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <SpinnerOverlay />}

      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
