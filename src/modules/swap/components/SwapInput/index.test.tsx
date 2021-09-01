import { render } from '@testing-library/react'

import createRouteWrapper from 'test/utils/createRouterWrapper'

import { TokenList } from 'modules/token/constants'

import * as SwapInputType from '.'

describe('SwapInput', () => {
  const useGetTokenBalanceFromSymbolSpy = jest.fn()
  jest.doMock(
    'modules/wallet/hooks/useGetTokenBalanceFromSymbol',
    () => useGetTokenBalanceFromSymbolSpy,
  )

  const mockRouterWrapper = createRouteWrapper(
    {
      initialIndex: 0,
      initialEntries: ['/somepath'],
    },
    {},
  )

  const onChangeSpy = jest.fn()

  const { default: SwapInput } = require('.') as typeof SwapInputType

  beforeEach(() => {
    useGetTokenBalanceFromSymbolSpy.mockReturnValue(TokenList.BUNNY)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should macth snapshots with selected token', () => {
      const { container, getByText } = render(
        <SwapInput
          title="title"
          to="?modal=true"
          tokenSymbol="BUNNY"
          value="10"
          onChange={onChangeSpy}
        />,
        {
          wrapper: mockRouterWrapper,
        },
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('BUNNY')).toBeDefined()
      expect(container.querySelector('a')?.href).toBe(
        'http://localhost/somepath?modal=true',
      )
    })

    it('should macth snapshots with selected token and balance', () => {
      useGetTokenBalanceFromSymbolSpy.mockReturnValue({
        ...TokenList.BUNNY,
        balance: 100,
      })

      const { container, getByText } = render(
        <SwapInput
          title="title"
          to="?modal=true"
          tokenSymbol="BUNNY"
          value="10"
          onChange={onChangeSpy}
        />,
        {
          wrapper: mockRouterWrapper,
        },
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('BUNNY')).toBeDefined()
      expect(container.querySelector('a')?.href).toBe(
        'http://localhost/somepath?modal=true',
      )
    })

    it('should macth snapshots with do not select token', () => {
      useGetTokenBalanceFromSymbolSpy.mockReturnValue(null)

      const { container, getByText } = render(
        <SwapInput
          title="title"
          to="?modal=true"
          tokenSymbol=""
          value="10"
          onChange={onChangeSpy}
        />,
        {
          wrapper: mockRouterWrapper,
        },
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Select a currency')).toBeDefined()
      expect(container.querySelector('a')?.href).toBe(
        'http://localhost/somepath?modal=true',
      )
    })
  })
})
