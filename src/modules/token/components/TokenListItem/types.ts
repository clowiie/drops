import { WalletBalance } from 'modules/wallet/types'

export interface Props {
  token: WalletBalance
  getToken: (token: string) => void
  disabled?: boolean
}
