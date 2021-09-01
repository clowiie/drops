import * as hasMetaMaskType from '.'

describe('hasMetaMask', () => {
  const { default: hasMetaMask } = require('.') as typeof hasMetaMaskType

  it('should return false if not have window.ethereum', () => {
    const result = hasMetaMask()

    expect(result).toBe(false)
  })

  it('should return true if have window.ethereum', () => {
    Object.defineProperty(window, 'ethereum', {
      value: {
        test: '123',
      },
    })

    const result = hasMetaMask()

    expect(result).toBe(true)
  })
})
