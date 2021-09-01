import React from 'react'

import Modal from 'common/components/Modal'
import useDisconnectWalletModal from 'modules/wallet/hooks/useDisconnectWalletModal'

import { Props } from './types'

const DisconnectWalletModal = ({ isOpen }: Props) => {
  const { closeModal, disconnectWallet } = useDisconnectWalletModal()

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="p-4 flex justify-between items-center">
        <span className="text-base">Disconnect</span>

        <button
          className="bg-gray-700 hover:bg-gray-500 text-white p-2 rounded-lg text-sm"
          onClick={disconnectWallet}
        >
          Logout
        </button>
      </div>
    </Modal>
  )
}

export default DisconnectWalletModal
