import loadable from '@loadable/component'

const ModalSubmittedTransaction = loadable(
  () => import(
    'modules/transaction/components/ModalSubmittedTransaction/component'
  ),
)

export default ModalSubmittedTransaction
