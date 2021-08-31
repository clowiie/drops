import React from 'react'

import Modal from 'common/components/Modal'
import useConnectWalletModal from 'modules/wallet/hooks/useConnectWalletModal'
import { ConnectorList } from 'modules/wallet/constants'
import ConnectWalletChoice from 'modules/wallet/components/ConnectWalletChoice'

import { Props } from './types'

const ConnectWalletModal = ({ isOpen }: Props) => {
  const { closeModal, connectWallet } = useConnectWalletModal()

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="p-4 flex justify-around">
        {ConnectorList.map((connector, index) => (
          <ConnectWalletChoice
            key={index}
            connector={connector}
            connectWallet={connectWallet}
          />
        ))}
      </div>
    </Modal>
  )
}

export default ConnectWalletModal
