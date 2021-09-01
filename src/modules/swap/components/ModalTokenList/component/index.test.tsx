import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as ModalTokenListType from '.'

describe('ModalTokenList', () => {
  const ModalSpy = mockComponent('common/components/Modal')
  const SwapTokenListSpy = mockComponent(
    'modules/swap/components/SwapTokenList',
  )

  const onCloseSpy = jest.fn()
  const getTokenSpy = jest.fn()

  const { default: ModalTokenList } = require('.') as typeof ModalTokenListType

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('snapshots', () => {
    it('should match snapshots', () => {
      const { container, getByText } = render(
        <ModalTokenList isOpen onClose={onCloseSpy} getToken={getTokenSpy} />,
      )

      expect(container.firstChild).toMatchSnapshot()
      expect(ModalSpy).toBeCalledTimes(1)
      expect(SwapTokenListSpy).toBeCalledTimes(1)
      expect(SwapTokenListSpy).toBeCalledWith({
        getToken: getTokenSpy,
      })
      expect(getByText('Select Token')).toBeDefined()
    })
  })
})
