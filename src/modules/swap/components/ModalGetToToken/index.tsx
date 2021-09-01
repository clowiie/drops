import React from 'react'
import { useLocation } from 'react-router-dom'

import parseQS from 'common/utils/parseQS'

import useModalGetToToken from 'modules/swap/hooks/useModalGetToToken'
import ModalTokenList from 'modules/swap/components/ModalTokenList'

const ModalGetToToken = () => {
  const { search } = useLocation()
  const { modalGetToToken } = parseQS(search)
  const { closeModal, getToken } = useModalGetToToken()

  if (!modalGetToToken) return null

  return (
    <ModalTokenList
      isOpen={!!modalGetToToken}
      onClose={closeModal}
      getToken={getToken}
    />
  )
}

export default ModalGetToToken
