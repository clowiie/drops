import React from 'react'

import Modal from 'common/components/Modal'
import SwapTokenList from 'modules/swap/components/SwapTokenList'

import { Props } from './types'

const ModalTokenList = ({ isOpen, onClose, getToken }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="py-4">
      <div className="px-4">
        <span className="text-lg font-semibold">Select Token</span>
      </div>

      <div className="pt-4">
        <SwapTokenList getToken={getToken} />
      </div>
    </div>
  </Modal>
)

export default ModalTokenList
