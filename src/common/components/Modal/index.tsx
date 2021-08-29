import React, { FC } from 'react'

import Modal from 'react-modal'

import { Props } from './types'

const ModalComponent: FC<Props> = ({ isOpen, onClose, children }) => (
  <Modal
    className="static bg-white rounded-md outline-none overflow-auto mx-2 w-full max-w-md"
    overlayClassName="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40"
    isOpen={isOpen}
    onRequestClose={onClose}
  >
    {children}
  </Modal>
)

export default ModalComponent
