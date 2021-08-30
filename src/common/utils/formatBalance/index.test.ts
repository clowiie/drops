import * as formatBalanceType from '.'

describe('formatBalance', () => {
  const { default: formatBalance } = require('.') as typeof formatBalanceType

  it('should format balance', () => {
    const result = formatBalance(0.0000123455667)

    expect(result).toBe(0.000012)
  })

  it('should format balance', () => {
    const result = formatBalance(100000000)

    expect(result).toBe(100000000)
  })
})
