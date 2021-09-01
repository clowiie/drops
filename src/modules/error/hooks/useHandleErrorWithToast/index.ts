import { useCallback } from 'react'

import showErrorToast from 'common/utils/showErrorToast'

export default function useHandleErrorWithToast<Args extends any[], Output>(
  action: (...args: Args) => Output,
) {
  const actionWithErrorHandling = useCallback(async (...args: Args) => {
    try {
      const result = await action(...args)

      return result
    } catch (e) {
      showErrorToast(e)

      return null
    }
  }, [])

  return actionWithErrorHandling
}
