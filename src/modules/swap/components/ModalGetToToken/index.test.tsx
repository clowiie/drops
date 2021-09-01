import { render } from '@testing-library/react'

import createRouteWrapper from 'test/utils/createRouterWrapper'
import mockComponent from 'test/utils/mockComponent'

import * as ModalGetToTokenType from '.'

describe('ModalGetToToken', () => {
  const useModalGetToTokenSpy = jest.fn()
  const closeModalSpy = jest.fn()
  const getTokenSpy = jest.fn()
  jest.doMock(
    'modules/swap/hooks/useModalGetToToken',
    () => useModalGetToTokenSpy,
  )

  const ModalTokenListSpy = mockComponent(
    'modules/swap/components/ModalTokenList',
  )

  const { default: ModalGetToToken } =
    require('.') as typeof ModalGetToTokenType

  beforeEach(() => {
    useModalGetToTokenSpy.mockReturnValue({
      closeModal: closeModalSpy,
      getToken: getTokenSpy,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('render component', () => {
    it('should render ModalTokenList if have modalGetToToken qs', () => {
      render(<ModalGetToToken />, {
        wrapper: createRouteWrapper(
          {
            initialIndex: 0,
            initialEntries: ['/somepath?modalGetToToken=true'],
          },
          {},
        ),
      })

      expect(ModalTokenListSpy).toBeCalledWith({
        isOpen: true,
        onClose: closeModalSpy,
        getToken: getTokenSpy,
      })
    })

    it('should do not render anything if not have modalGetToToken qs', () => {
      render(<ModalGetToToken />, {
        wrapper: createRouteWrapper(
          {
            initialIndex: 0,
            initialEntries: ['/somepath'],
          },
          {},
        ),
      })

      expect(ModalTokenListSpy).not.toBeCalled()
    })
  })
})
