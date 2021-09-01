import * as showSuccessToastType from '.'

describe('showSuccessToast', () => {
  const toastSpy = jest.fn()
  jest.doMock('react-toastify', () => ({
    toast: toastSpy,
  }))

  const { default: showSuccessToast } = require('.') as typeof showSuccessToastType

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call toast with error msg', () => {
    showSuccessToast('Message')

    expect(toastSpy).toBeCalledTimes(1)
  })
})
