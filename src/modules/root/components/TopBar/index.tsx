import React from 'react'

import ConnectWalletButton from 'modules/wallet/components/ConnectWalletButton'
import DisconnectWalletButton from 'modules/wallet/components/DisconnectWalletButton'
import useWalletContext from 'modules/wallet/hooks/useWalletContext'

const TopBar = () => {
  const { walletAddress } = useWalletContext()

  return (
    <div className="w-full bg-white shadow-sm flex justify-between items-center px-6 py-4 sm:px-12">
      <span className="text-lg font-semibold">Drops</span>

      {walletAddress ? <DisconnectWalletButton /> : <ConnectWalletButton />}
    </div>
  )
}

export default TopBar
