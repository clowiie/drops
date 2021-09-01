import React from 'react'
import { Link } from 'react-router-dom'

import buildQueryParams from 'common/utils/buildQueryParams'

const ConnectWalletButton = () => {
  const to = buildQueryParams({ modalConnectWallet: true })

  return (
    <Link className="bg-gray-700 hover:bg-gray-500 text-white p-2 rounded-lg text-sm" to={to}>
      Connect Wallet
    </Link>
  )
}

export default ConnectWalletButton
