import React from 'react'
import { useLocation } from 'react-router-dom'

import parseQS from 'common/utils/parseQS'

import useModalGetFromToken from 'modules/swap/hooks/useModalGetFromToken'
import ModalTokenList from 'modules/swap/components/ModalTokenList'

const ModalGetFromToken = () => {
  const { search } = useLocation()
  const { modalGetFromToken } = parseQS(search)
  const { closeModal, getToken } = useModalGetFromToken()

  if (!modalGetFromToken) return null

  return (
    <ModalTokenList
      isOpen={!!modalGetFromToken}
      onClose={closeModal}
      getToken={getToken}
    />
  )
}

export default ModalGetFromToken
