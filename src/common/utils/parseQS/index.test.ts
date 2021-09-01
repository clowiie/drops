import * as parseQSType from '.'

describe('parseQS', () => {
  const { default: parseQS } = require('.') as typeof parseQSType

  it('should convert qs to object', () => {
    const result = parseQS('?test=123&aa=111')

    expect(result).toStrictEqual({
      test: '123',
      aa: '111',
    })
  })

  it('should convert qs to object with empty string', () => {
    const result = parseQS('')

    expect(result).toStrictEqual({})
  })
})
