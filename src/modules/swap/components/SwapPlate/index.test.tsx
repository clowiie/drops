import { render } from '@testing-library/react'

import createContextWrapper from 'test/utils/createContextWrapper'
import mockComponent from 'test/utils/mockComponent'

import SwapTokenContext from 'modules/swap/stores/contexts/SwapTokenContext'

import { InputSwapToken } from 'modules/swap/constants'
import * as SwapPlateType from '.'

describe('SwapPlate', () => {
  const SwapButtonSpy = mockComponent('modules/swap/components/SwapButton')
  const SwapInputSpy = mockComponent('modules/swap/components/SwapInput')

  const useComparePriceSpy = jest.fn()
  jest.doMock('modules/swap/hooks/useComparePrice', () => useComparePriceSpy)

  const useHandleInputSwapSpy = jest.fn()
  const onChangeAmountInSpy = jest.fn()
  const onChangeAmountOutSpy = jest.fn()
  jest.doMock(
    'modules/swap/hooks/useHandleInputSwap',
    () => useHandleInputSwapSpy,
  )

  const { default: SwapPlate } = require('.') as typeof SwapPlateType

  beforeEach(() => {
    useComparePriceSpy.mockReturnValue(100)

    useHandleInputSwapSpy.mockReturnValue({
      amountIn: '10',
      amountOut: '100',
      estimate: InputSwapToken.In,
      onChangeAmountIn: onChangeAmountInSpy,
      onChangeAmountOut: onChangeAmountOutSpy,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should macth snapshots with estimate amount out', () => {
      const { container, getByText } = render(<SwapPlate />, {
        wrapper: createContextWrapper(SwapTokenContext, {
          fromToken: 'BUSD',
          setFromToken: () => {},
          toToken: 'CAKE',
          setToToken: () => {},
        }),
      })

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Exchange')).toBeDefined()
      expect(getByText('Trade tokens in an instant')).toBeDefined()
      expect(getByText('Price')).toBeDefined()
      expect(SwapInputSpy).toBeCalledWith({
        onChange: onChangeAmountInSpy,
        title: 'From (estimated)',
        to: '?modalGetFromToken=true',
        tokenSymbol: 'BUSD',
        value: '10',
      })
      expect(SwapInputSpy).toBeCalledWith({
        onChange: onChangeAmountOutSpy,
        title: 'To ',
        to: '?modalGetToToken=true',
        tokenSymbol: 'CAKE',
        value: '100',
      })
      expect(SwapButtonSpy).toBeCalledWith({ amountIn: 10 })
    })

    it('should macth snapshots with estimate amount in', () => {
      useHandleInputSwapSpy.mockReturnValue({
        amountIn: '10',
        amountOut: '100',
        estimate: InputSwapToken.Out,
        onChangeAmountIn: onChangeAmountInSpy,
        onChangeAmountOut: onChangeAmountOutSpy,
      })

      const { container, getByText } = render(<SwapPlate />, {
        wrapper: createContextWrapper(SwapTokenContext, {
          fromToken: 'BUSD',
          setFromToken: () => {},
          toToken: 'CAKE',
          setToToken: () => {},
        }),
      })

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Exchange')).toBeDefined()
      expect(getByText('Trade tokens in an instant')).toBeDefined()
      expect(SwapInputSpy).toBeCalledWith({
        onChange: onChangeAmountInSpy,
        title: 'From ',
        to: '?modalGetFromToken=true',
        tokenSymbol: 'BUSD',
        value: '10',
      })
      expect(SwapInputSpy).toBeCalledWith({
        onChange: onChangeAmountOutSpy,
        title: 'To (estimated)',
        to: '?modalGetToToken=true',
        tokenSymbol: 'CAKE',
        value: '100',
      })
      expect(SwapButtonSpy).toBeCalledWith({ amountIn: 10 })
    })

    it('should macth snapshots without compare price', () => {
      useComparePriceSpy.mockReturnValue(undefined)

      const { container, getByText } = render(<SwapPlate />, {
        wrapper: createContextWrapper(SwapTokenContext, {
          fromToken: 'BUSD',
          setFromToken: () => {},
          toToken: 'CAKE',
          setToToken: () => {},
        }),
      })

      expect(container.firstChild).toMatchSnapshot()
      expect(getByText('Exchange')).toBeDefined()
      expect(getByText('Trade tokens in an instant')).toBeDefined()
      expect(SwapInputSpy).toBeCalledWith({
        onChange: onChangeAmountInSpy,
        title: 'From (estimated)',
        to: '?modalGetFromToken=true',
        tokenSymbol: 'BUSD',
        value: '10',
      })
      expect(SwapInputSpy).toBeCalledWith({
        onChange: onChangeAmountOutSpy,
        title: 'To ',
        to: '?modalGetToToken=true',
        tokenSymbol: 'CAKE',
        value: '100',
      })
      expect(SwapButtonSpy).toBeCalledWith({ amountIn: 10 })
    })
  })
})
