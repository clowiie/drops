import React, { useCallback } from 'react'

import useHandleErrorWithToast from 'modules/error/hooks/useHandleErrorWithToast'
import { Connector } from 'modules/wallet/types'
import { ConnectorId } from 'modules/wallet/constants'

type Props = {
  connector: Connector
  connectWallet: (connectorId: ConnectorId) => void
}

const ConnectWalletChoice = ({ connector, connectWallet }: Props) => {
  const connectWalletWithErrorToastHandling =
    useHandleErrorWithToast(connectWallet)

  const onClick = useCallback(async () => {
    await connectWalletWithErrorToastHandling(connector.connectorId)
  }, [connector, connectWalletWithErrorToastHandling])

  return (
    <button onClick={onClick}>
      <div className="flex flex-col items-center justify-between">
        <img
          className="object-contain w-16 h-16"
          src={connector.logo}
          alt="Connector Logo"
          loading="lazy"
        />

        <span className="text-sm">{connector.name}</span>
      </div>
    </button>
  )
}

export default ConnectWalletChoice
