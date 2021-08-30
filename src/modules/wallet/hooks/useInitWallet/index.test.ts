import { renderHook } from '@testing-library/react-hooks'

import WalletController from 'modules/wallet/stores/controllers/Wallet'

import * as useInitWalletType from '.'

describe('useInitWallet', () => {
  const { default: useInitWallet } = require('.') as typeof useInitWalletType

  it('should call initSetWallet, activate and return wallet address', () => {
    const initSetWalletSpy = jest
      .spyOn(WalletController, 'initSetWallet')
      .mockImplementation(() => {})

    const activateSpy = jest
      .spyOn(WalletController, 'activate')
      .mockImplementation(() => Promise.resolve())

    const { result } = renderHook(() => useInitWallet())

    expect(initSetWalletSpy).toBeCalledTimes(1)
    expect(activateSpy).toBeCalledTimes(1)
    expect(result.current.walletAddress).toBe('')
  })
})
