import { SWAP_ROOT_PATH } from 'modules/swap/constants'
import SwapPage from 'modules/swap/pages/SwapPage/component'
import SwapRootPage from 'modules/swap/pages/SwapRootPage/component'

const swapPage = {
  path: SWAP_ROOT_PATH,
  exact: true,
  component: SwapPage,
}

const swapRootPage = {
  path: SWAP_ROOT_PATH,
  component: SwapRootPage,
  routes: [swapPage],
}

export default [swapRootPage]
