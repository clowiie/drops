import React from 'react'

import { Location, History } from 'history'

import { render } from '@testing-library/react'

import mockComponent from 'test/utils/mockComponent'

import * as RootPageType from '.'

describe('RootPage', () => {
  const renderRoutesSpy = jest.fn().mockReturnValue(null)
  jest.doMock('react-router-config', () => ({
    renderRoutes: renderRoutesSpy,
  }))

  const ErrorBoundarySpy = mockComponent(
    'modules/error/components/ErrorBoundary',
  )
  const LoadingProviderSpy = mockComponent(
    'modules/loading/stores/providers/LoadingProvider',
  )
  const ModalSubmittedTransactionControllerSpy = mockComponent(
    'modules/transaction/components/ModalSubmittedTransactionController',
  )
  const PendingTransactionProviderSpy = mockComponent(
    'modules/transaction/stores/providers/PendingTransactionProvider',
  )
  const SubmittedTransactionProviderSpy = mockComponent(
    'modules/transaction/stores/providers/SubmittedTransactionProvider',
  )
  const WalletProviderSpy = mockComponent(
    'modules/wallet/stores/providers/WalletProvider',
  )
  const WalletBalanceProviderSpy = mockComponent(
    'modules/wallet/stores/providers/WalletBalanceProvider',
  )
  const ConnectWalletModalControllerSpy = mockComponent(
    'modules/wallet/components/ConnectWalletModalController',
  )
  const DisconnectWalletModalControllerSpy = mockComponent(
    'modules/wallet/components/DisconnectWalletModalController',
  )
  const TopBarSpy = mockComponent('modules/root/components/TopBar')

  const mockRoute = {
    routes: [
      {
        path: '/',
      },
    ],
  }

  const mockLocation = {} as Location
  const mockHistory = {} as History
  const mockMatch = {} as any

  const { default: RootPage } = require('.') as typeof RootPageType

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render root page', () => {
    render(
      <RootPage
        route={mockRoute}
        location={mockLocation}
        history={mockHistory}
        match={mockMatch}
      />,
    )

    expect(renderRoutesSpy).toBeCalledTimes(1)
    expect(ErrorBoundarySpy).toBeCalledTimes(1)
    expect(LoadingProviderSpy).toBeCalledTimes(1)
    expect(ModalSubmittedTransactionControllerSpy).toBeCalledTimes(1)
    expect(PendingTransactionProviderSpy).toBeCalledTimes(1)
    expect(SubmittedTransactionProviderSpy).toBeCalledTimes(1)
    expect(WalletProviderSpy).toBeCalledTimes(1)
    expect(WalletBalanceProviderSpy).toBeCalledTimes(1)
    expect(ConnectWalletModalControllerSpy).toBeCalledTimes(1)
    expect(DisconnectWalletModalControllerSpy).toBeCalledTimes(1)
    expect(TopBarSpy).toBeCalledTimes(1)
  })
})
