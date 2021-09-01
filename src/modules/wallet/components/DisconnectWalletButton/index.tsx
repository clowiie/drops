import React from 'react'

import { Link } from 'react-router-dom'

import buildQueryParams from 'common/utils/buildQueryParams'
import useWalletContext from 'modules/wallet/hooks/useWalletContext'

const DisconnectWalletButton = () => {
  const { walletAddress } = useWalletContext()
  const to = buildQueryParams({ modalDisconnectWallet: true })

  const address = walletAddress
    ? `${walletAddress.substr(0, 2)}...${walletAddress.substr(
      walletAddress.length - 4,
    )}`
    : ''

  return (
    <Link
      className="bg-gray-700 hover:bg-gray-500 text-white p-2 rounded-lg text-sm"
      to={to}
    >
      {address}
    </Link>
  )
}

export default DisconnectWalletButton
