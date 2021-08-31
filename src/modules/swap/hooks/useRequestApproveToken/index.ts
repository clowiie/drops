import { useCallback } from 'react'
import { ethers } from 'ethers'

import Contract from 'common/constants/contracts/bsc'
import ERC20 from 'common/constants/abis/abi-erc20'
import Token from 'common/constants/tokens/bsc'

import { MAXIMUM_UINT256, DEFAULT_GAS_LIMIT } from 'modules/swap/constants'
import WalletController from 'modules/wallet/stores/controllers/Wallet'

const useRequestApproveToken = () => useCallback(async (tokenAddress: Token) => {
  const signer = WalletController.wallet?.getSigner()

  const tokenContract = new ethers.Contract(tokenAddress, ERC20, signer)

  let estimatedGas
  try {
    estimatedGas = await tokenContract.estimateGas.approve(
      Contract.Pancake.Router,
      MAXIMUM_UINT256,
    )
  } catch (e) {
    // do nothing
  }

  const transaction: ethers.providers.TransactionResponse =
      await tokenContract.approve(Contract.Pancake.Router, MAXIMUM_UINT256, {
        gasPrice: ethers.utils.parseUnits('5', 'gwei'),
        gasLimit: estimatedGas ? estimatedGas.toString() : DEFAULT_GAS_LIMIT,
      })

  return transaction
}, [])

export default useRequestApproveToken
