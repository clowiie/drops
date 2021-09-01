import React from 'react'

import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'

import ErrorBoundary from 'modules/error/components/ErrorBoundary'
import GlobalError from 'modules/error/components/GlobalError'
import LoadingProvider from 'modules/loading/stores/providers/LoadingProvider'
import ModalSubmittedTransactionController from 'modules/transaction/components/ModalSubmittedTransactionController'
import PendingTransactionProvider from 'modules/transaction/stores/providers/PendingTransactionProvider'
import SubmittedTransactionProvider from 'modules/transaction/stores/providers/SubmittedTransactionProvider'
import WalletProvider from 'modules/wallet/stores/providers/WalletProvider'
import WalletBalanceProvider from 'modules/wallet/stores/providers/WalletBalanceProvider'
import TopBar from 'modules/root/components/TopBar'
import ConnectWalletModalController from 'modules/wallet/components/ConnectWalletModalController'
import DisconnectWalletModalController from 'modules/wallet/components/DisconnectWalletModalController'

import combineContextProvider from 'modules/root/utils/combineContextProvider'

const RootPage = ({ route }: RouteConfigComponentProps) => (
  <div className="font-mono text-gray-700 w-screen min-h-screen bg-gray-50">
    <ErrorBoundary ErrorHandlerComponent={GlobalError}>
      {combineContextProvider(
        [
          SubmittedTransactionProvider,
          PendingTransactionProvider,
          WalletBalanceProvider,
          WalletProvider,
          LoadingProvider,
        ],
        <>
          <TopBar />
          <ConnectWalletModalController />
          <ModalSubmittedTransactionController />
          <DisconnectWalletModalController />

          {renderRoutes(route?.routes)}
        </>,
      )}
    </ErrorBoundary>
  </div>
)

export default RootPage
