import { useCallback } from 'react'

import { ethers } from 'ethers'

import Contract from 'common/constants/contracts/bsc'
import Router from 'common/constants/abis/abi-router'
import Token from 'common/constants/tokens/bsc'

import JsonRpcController from 'modules/rpc/stores/controllers/JsonRpc'
import { DEFAULT_GAS_LIMIT } from 'modules/swap/constants'
import WalletController from 'modules/wallet/stores/controllers/Wallet'

const useRequestSwapToken = () => useCallback(
  async ({
    walletAddress,
    amountIn,
    token0,
    token1,
  }: {
      walletAddress: string
      amountIn: string
      token0: Token
      token1: Token
    }) => {
    const amountsInBigNumber = ethers.utils.parseUnits(amountIn, 18)
    const amounts = await JsonRpcController.pancakeRounter.getAmountsOut(
      amountsInBigNumber,
      [token0, token1],
    )

    const slippage = 0.5
    const estimateAmountsOut = ethers.utils.formatUnits(amounts[1])
    const amountsOutBigNumber = ethers.utils.parseUnits(
      (
        +estimateAmountsOut -
          (+estimateAmountsOut / 100) * slippage
      ).toString(),
      18,
    )

    const signer = WalletController.wallet?.getSigner()
    const router = new ethers.Contract(
      Contract.Pancake.Router,
      Router,
      signer,
    )

    const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 10
    let estimatedGas
    try {
      estimatedGas = await router.estimateGas.swapExactTokensForTokens(
        amountsInBigNumber,
        amountsOutBigNumber,
        [token0, token1],
        walletAddress,
        deadline,
      )
    } catch (e) {
      // do nothing
    }

    const transaction: ethers.providers.TransactionResponse =
        await router.swapExactTokensForTokens(
          amountsInBigNumber,
          amountsOutBigNumber,
          [token0, token1],
          walletAddress,
          deadline,
          {
            gasPrice: ethers.utils.parseUnits('5', 'gwei'),
            gasLimit: estimatedGas
              ? estimatedGas.toString()
              : DEFAULT_GAS_LIMIT,
          },
        )

    return transaction
  },
  [],
)

export default useRequestSwapToken
