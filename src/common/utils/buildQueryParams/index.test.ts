import * as buildQueryParamsType from '.'

describe('buildQueryParams', () => {
  Object.defineProperty(window, 'location', {
    value: {
      search: '?test=123',
    },
  })

  const { default: buildQueryParams } = require('.') as typeof buildQueryParamsType

  it('should convert object to qs', () => {
    const result = buildQueryParams({
      ss: '555',
    })

    expect(result).toBe('?test=123&ss=555')
  })

  it('should convert object to qs with empty object', () => {
    const result = buildQueryParams({})

    expect(result).toBe('?test=123')
  })
})
