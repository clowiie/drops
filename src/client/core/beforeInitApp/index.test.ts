import * as beforeInitAppType from '.'

describe('beforeInitApp', () => {
  const setAppElementSpy = jest.fn()
  jest.doMock('react-modal', () => ({
    setAppElement: setAppElementSpy,
  }))

  const initControllerSpy = jest.fn()
  jest.doMock('modules/rpc/stores/controllers/JsonRpc', () => ({
    initController: initControllerSpy,
  }))

  const { default: beforeInitApp } = require('.') as typeof beforeInitAppType

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should setAppElement, initController', () => {
    beforeInitApp()

    expect(setAppElementSpy).toBeCalledWith('#root')
    expect(initControllerSpy).toBeCalledTimes(1)
  })
})
