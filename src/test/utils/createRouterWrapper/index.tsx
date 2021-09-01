import { FC } from 'react'

import * as ReactRouterDOMType from 'react-router-dom'

export default function createRouteWrapper(
  routerProps: Record<string, any>,
  routeProps: Record<string, any>,
): FC {
  const { MemoryRouter, Route } =
    require('react-router-dom') as typeof ReactRouterDOMType

  return ({ children }) => (
    <MemoryRouter {...routerProps}>
      <Route {...routeProps}>{children}</Route>
    </MemoryRouter>
  )
}
