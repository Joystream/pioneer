import { useMemo } from 'react'

import { useApi } from '../../common/hooks/useApi'
import { groupExtrinsics } from '../types'

export function useWithdrawMembershipTransaction(groupName: string) {
  const { api } = useApi()

  return useMemo(() => {
    if (api && groupName in groupExtrinsics) {
      const name = groupName as keyof typeof groupExtrinsics
      return api.tx[groupExtrinsics[name]].withdrawApplication
    }
  }, [api, groupName])
}
