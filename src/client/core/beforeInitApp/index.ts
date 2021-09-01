import Modal from 'react-modal'

import JsonRpcController from 'modules/rpc/stores/controllers/JsonRpc'

const beforeInitApp = () => {
  Modal.setAppElement('#root')

  JsonRpcController.initController()
}

export default beforeInitApp
