import Token from 'common/constants/tokens/bsc'
import { TokenType } from 'modules/token/types'

import ALPACALogo from 'modules/token/images/alpaca-logo.png'
import BUNNYLogo from 'modules/token/images/bunny-logo.svg'
import BUSDLogo from 'modules/token/images/busd-logo.svg'
import CAKELogo from 'modules/token/images/cake-logo.svg'
import ETHLogo from 'modules/token/images/eth-logo.svg'

const tokenList = {
  ALPACA: {
    address: Token.Alpaca,
    name: 'Alpaca',
    symbol: 'ALPACA',
    logo: ALPACALogo,
  },
  BUNNY: {
    address: Token.Bunny,
    name: 'Pancake BUNNY',
    symbol: 'BUNNY',
    logo: BUNNYLogo,
  },
  BUSD: {
    address: Token.Busd,
    name: 'BUSD Token',
    symbol: 'BUSD',
    logo: BUSDLogo,
  },
  CAKE: {
    address: Token.Cake,
    name: 'PancakeSwap Token',
    symbol: 'CAKE',
    logo: CAKELogo,
  },
  ETH: {
    address: Token.Eth,
    name: 'Ethereum Token',
    symbol: 'ETH',
    logo: ETHLogo,
  },
} as Record<string, TokenType>

export const TokenList = Object.freeze(tokenList)
