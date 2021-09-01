import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import useSwapTokenContext from 'modules/swap/hooks/useSwapTokenContext'

const useModalGetFromToken = () => {
  const history = useHistory()
  const { setFromToken } = useSwapTokenContext()

  const closeModal = useCallback(() => {
    history.goBack()
  }, [history])

  const getToken = useCallback((token: string) => {
    setFromToken(token)
    closeModal()
  }, [closeModal, setFromToken])

  return {
    closeModal,
    getToken,
  }
}

export default useModalGetFromToken
