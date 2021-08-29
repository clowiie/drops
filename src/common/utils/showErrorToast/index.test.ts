import * as showErrorToastType from '.'

describe('showErrorToast', () => {
  const toastSpy = jest.fn()
  jest.doMock('react-toastify', () => ({
    toast: toastSpy,
  }))

  const { default: showErrorToast } = require('.') as typeof showErrorToastType

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call toast with error', () => {
    showErrorToast('Error Message')

    expect(toastSpy).toBeCalledTimes(1)
  })

  it('should call toast with error msg', () => {
    showErrorToast({
      message: 'Error Message',
    })

    expect(toastSpy).toBeCalledTimes(1)
  })
})
