import RootPage from 'modules/root/pages/RootPage'
import swapRootRoutes from 'modules/swap/routes'

export default [
  {
    path: '*',
    component: RootPage,
    routes: [...swapRootRoutes],
  },
]
