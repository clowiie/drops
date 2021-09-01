import { renderHook } from '@testing-library/react-hooks'

import createContextWrapper from 'test/utils/createContextWrapper'

import WalletContext from 'modules/wallet/stores/contexts/WalletContext'

import * as useWalletContextType from '.'

describe('useWalletContext', () => {
  const { default: useWalletContext } =
    require('.') as typeof useWalletContextType

  it('should return wallet address context', () => {
    const { result } = renderHook(() => useWalletContext(), {
      wrapper: createContextWrapper(WalletContext, {
        walletAddress: 'walletAddress',
      }),
    })

    expect(result.current.walletAddress).toBe('walletAddress')
  })

  it('should return wallet address context with empty state', () => {
    const { result } = renderHook(() => useWalletContext(), {
      wrapper: createContextWrapper(WalletContext, {
        walletAddress: '',
      }),
    })

    expect(result.current.walletAddress).toBe('')
  })
})
