import { ethers } from 'ethers'

import Contract from 'common/constants/contracts/bsc'
import Factory from 'common/constants/abis/abi-factory'
import Router from 'common/constants/abis/abi-router'
import ERC20 from 'common/constants/abis/abi-erc20'
import Pairs from 'common/constants/abis/abi-pairs'
import Token from 'common/constants/tokens/bsc'

import { BSC_RPC_URL, NOT_FOUND_ADDRESS } from 'modules/rpc/constants'

class JsonRpcController {
  static provider: ethers.providers.JsonRpcProvider

  static pancakeFactory: ethers.Contract

  static pancakeRounter: ethers.Contract

  static initController() {
    this.provider = new ethers.providers.JsonRpcProvider(BSC_RPC_URL)

    this.pancakeFactory = new ethers.Contract(
      Contract.Pancake.Factory,
      Factory,
      this.provider,
    )

    this.pancakeRounter = new ethers.Contract(
      Contract.Pancake.Router,
      Router,
      this.provider,
    )
  }

  static async checkTokenAmountsApproved(
    walletAddress: string,
    tokenAddress: Token,
  ) {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20,
      this.provider,
    )
    const checkAmountsApprove = ethers.utils.formatUnits(
      await tokenContract.allowance(walletAddress, Contract.Pancake.Router),
    )

    return checkAmountsApprove
  }

  static async getPairContract(token0: Token, token1: Token) {
    const pairAddress = await this.pancakeFactory.getPair(token0, token1)

    if (pairAddress === NOT_FOUND_ADDRESS) {
      return null
    }

    const pairContract = new ethers.Contract(pairAddress, Pairs, this.provider)
    return pairContract
  }

  static async getTokenContractAndBalance(
    walletAddress: string,
    tokenAddress: Token,
  ) {
    const contractToken = new ethers.Contract(
      tokenAddress,
      ERC20,
      this.provider,
    )
    const balance = await contractToken.balanceOf(walletAddress)

    return {
      contract: contractToken,
      balance: +ethers.utils.formatUnits(balance),
    }
  }
}

export default JsonRpcController
