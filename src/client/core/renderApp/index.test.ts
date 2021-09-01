import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as renderAppType from '.'

describe('renderApp', () => {
  const renderSpy = jest.fn()
  jest.doMock('react-dom', () => ({
    render: renderSpy,
  }))

  const AppSpy = mockComponent('client/components/App')

  const root = document.createElement('div')
  root.setAttribute('id', 'root')
  document.body.append(root)

  const { default: renderApp } = require('.') as typeof renderAppType

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should perform render to root', () => {
    renderApp()

    const [app, targetRenderElement] = renderSpy.mock.calls[0]

    expect(targetRenderElement).toBe(root)

    render(app)

    expect(AppSpy).toBeCalledTimes(1)
  })
})
