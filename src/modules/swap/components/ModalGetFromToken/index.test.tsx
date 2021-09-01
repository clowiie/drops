import { render } from '@testing-library/react'

import createRouteWrapper from 'test/utils/createRouterWrapper'
import mockComponent from 'test/utils/mockComponent'

import * as ModalGetFromTokenType from '.'

describe('ModalGetFromToken', () => {
  const useModalGetFromTokenSpy = jest.fn()
  const closeModalSpy = jest.fn()
  const getTokenSpy = jest.fn()
  jest.doMock(
    'modules/swap/hooks/useModalGetFromToken',
    () => useModalGetFromTokenSpy,
  )

  const ModalTokenListSpy = mockComponent(
    'modules/swap/components/ModalTokenList',
  )

  const { default: ModalGetFromToken } =
    require('.') as typeof ModalGetFromTokenType

  beforeEach(() => {
    useModalGetFromTokenSpy.mockReturnValue({
      closeModal: closeModalSpy,
      getToken: getTokenSpy,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('render component', () => {
    it('should render ModalTokenList if have modalGetFromToken qs', () => {
      render(<ModalGetFromToken />, {
        wrapper: createRouteWrapper(
          {
            initialIndex: 0,
            initialEntries: ['/somepath?modalGetFromToken=true'],
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

    it('should do not render anything if not have modalGetFromToken qs', () => {
      render(<ModalGetFromToken />, {
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
