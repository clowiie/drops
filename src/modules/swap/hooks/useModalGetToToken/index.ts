import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import useSwapTokenContext from 'modules/swap/hooks/useSwapTokenContext'

const useModalGetToToken = () => {
  const history = useHistory()
  const { setToToken } = useSwapTokenContext()

  const closeModal = useCallback(() => {
    history.goBack()
  }, [history])

  const getToken = useCallback((token: string) => {
    setToToken(token)
    closeModal()
  }, [closeModal, setToToken])

  return {
    closeModal,
    getToken,
  }
}

export default useModalGetToToken
