import React from 'react'

import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'

import SwapTokenProvider from 'modules/swap/stores/providers/SwapTokenProvider'
import ModalGetFromToken from 'modules/swap/components/ModalGetFromToken'
import ModalGetToToken from 'modules/swap/components/ModalGetToToken'

const SwapRootPage = ({ route }: RouteConfigComponentProps) => (
  <SwapTokenProvider>
    <ModalGetFromToken />
    <ModalGetToToken />

    {renderRoutes(route?.routes)}
  </SwapTokenProvider>
)

export default SwapRootPage
