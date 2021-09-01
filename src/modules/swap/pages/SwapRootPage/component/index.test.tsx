import React from 'react'

import { Location, History } from 'history'

import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as SwapRootPageType from '.'

describe('SwapRootPage', () => {
  const renderRoutesSpy = jest.fn().mockReturnValue(null)
  jest.doMock('react-router-config', () => ({
    renderRoutes: renderRoutesSpy,
  }))

  const SwapTokenProviderSpy = mockComponent(
    'modules/swap/stores/providers/SwapTokenProvider',
  )
  const ModalGetFromTokenSpy = mockComponent(
    'modules/swap/components/ModalGetFromToken',
  )
  const ModalGetToTokenSpy = mockComponent(
    'modules/swap/components/ModalGetToToken',
  )

  const mockRoute = {
    routes: [
      {
        path: '/',
      },
    ],
  }

  const mockLocation = {} as Location
  const mockHistory = {} as History
  const mockMatch = {} as any

  const { default: SwapRootPage } = require('.') as typeof SwapRootPageType

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render root page', () => {
    render(
      <SwapRootPage
        route={mockRoute}
        location={mockLocation}
        history={mockHistory}
        match={mockMatch}
      />,
    )

    expect(renderRoutesSpy).toBeCalledTimes(1)
    expect(SwapTokenProviderSpy).toBeCalledTimes(1)
    expect(ModalGetFromTokenSpy).toBeCalledTimes(1)
    expect(ModalGetToTokenSpy).toBeCalledTimes(1)
  })
})
