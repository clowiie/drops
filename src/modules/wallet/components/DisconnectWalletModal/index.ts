import loadable from '@loadable/component'

const DisconnectWalletModal = loadable(
  () => import('modules/wallet/components/DisconnectWalletModal/component'),
)

export default DisconnectWalletModal
