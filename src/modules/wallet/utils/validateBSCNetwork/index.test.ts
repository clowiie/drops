import * as validateBSCNetworkType from '.'

describe('validateBSCNetwork', () => {
  const { default: validateBSCNetwork } =
    require('.') as typeof validateBSCNetworkType

  it('should return true if network is BNB network', () => {
    const result = validateBSCNetwork({
      name: 'bnb',
      chainId: 56,
    })

    expect(result).toBe(true)
  })

  it('should return false if network is not BNB network', () => {
    const result = validateBSCNetwork({
      name: 'bnbt',
      chainId: 97,
    })

    expect(result).toBe(false)
  })
})
