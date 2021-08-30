import React from 'react'

import { fireEvent, render } from '@testing-library/react'

import { TokenList } from 'modules/token/constants'

import * as TokenListItemType from '.'

describe('TokenListItem', () => {
  const getTokenSpy = jest.fn()

  const { default: TokenListItem } = require('.') as typeof TokenListItemType

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container } = render(
        <TokenListItem token={TokenList.CAKE} getToken={getTokenSpy} />,
      )

      expect(container.firstChild).toMatchSnapshot()
    })

    it('should match snapshots with disabled style', () => {
      const { container } = render(
        <TokenListItem
          token={TokenList.CAKE}
          getToken={getTokenSpy}
          disabled
        />,
      )

      expect(container.firstChild).toMatchSnapshot()
    })

    it('should match snapshots with have balance style', () => {
      const { container } = render(
        <TokenListItem
          token={{ ...TokenList.CAKE, balance: 100 }}
          getToken={getTokenSpy}
          disabled
        />,
      )

      expect(container.firstChild).toMatchSnapshot()
    })
  })

  describe('render component', () => {
    it('should call getToken when press TokenListItem', () => {
      const { getByText } = render(
        <TokenListItem token={TokenList.CAKE} getToken={getTokenSpy} />,
      )

      const item = getByText(TokenList.CAKE.symbol)

      fireEvent.click(item)

      expect(getTokenSpy).toBeCalledWith(TokenList.CAKE.symbol)
    })

    it('should do not call getToken when press TokenListItem if disabled', () => {
      const { getByText } = render(
        <TokenListItem
          token={TokenList.CAKE}
          getToken={getTokenSpy}
          disabled
        />,
      )

      const item = getByText(TokenList.CAKE.symbol)

      fireEvent.click(item)

      expect(getTokenSpy).not.toBeCalled()
    })
  })
})
