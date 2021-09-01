import useSwapTokenContext from 'modules/swap/hooks/useSwapTokenContext'
import useGetTokenBalanceFromSymbol from 'modules/wallet/hooks/useGetTokenBalanceFromSymbol'

const useGetSwapTokenBalance = () => {
  const { fromToken, toToken } = useSwapTokenContext()

  return {
    fromTokenBalance: useGetTokenBalanceFromSymbol(fromToken),
    toTokenBalance: useGetTokenBalanceFromSymbol(toToken),
  }
}

export default useGetSwapTokenBalance
