import { ethers } from 'ethers'

import CHAINS from 'common/constants/chains'

const validateBSCNetwork = (network: ethers.providers.Network) => {
  if (
    network.chainId !== CHAINS.BNB.chainId
    && network.name !== CHAINS.BNB.name
  ) {
    return false
  }

  return true
}

export default validateBSCNetwork
