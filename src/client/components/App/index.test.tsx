import React from 'react'

import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as AppType from '.'

describe('App', () => {
  const GlobalStyleSpy = mockComponent('core/style/GlobalStyle')

  const browserSpy = jest.fn()
  const MockBrowserRouter = ({ children }: Record<string, any>) => {
    browserSpy()
    return children
  }
  jest.doMock('react-router-dom', () => ({
    BrowserRouter: MockBrowserRouter,
  }))

  const renderRoutesSpy = jest.fn().mockReturnValue(null)
  jest.doMock('react-router-config', () => ({
    renderRoutes: renderRoutesSpy,
  }))

  jest.doMock('modules/root/routes', () => [])

  const { default: App } = require('.') as typeof AppType

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render route under browser router', () => {
    render(<App />)

    expect(browserSpy).toBeCalledTimes(1)
    expect(GlobalStyleSpy).toBeCalledTimes(1)
    expect(renderRoutesSpy).toBeCalledTimes(1)
    expect(renderRoutesSpy).toBeCalledWith([])
  })
})
