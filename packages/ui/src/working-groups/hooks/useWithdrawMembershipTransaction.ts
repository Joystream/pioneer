import { AugmentedSubmittables } from '@polkadot/api/types'
import { useMemo } from 'react'

import { useApi } from '../../common/hooks/useApi'

export function useWithdrawMembershipTransaction(groupName: string) {
  const { api } = useApi()

  return useMemo(() => {
    if (api && groupName in groupExtrinsics) {
      const name = groupName as keyof typeof groupExtrinsics
      return api.tx[groupExtrinsics[name]].withdrawApplication
    }
  }, [api, groupName])
}

enum groupNames {
  forum,
  storage,
  content,
  membership,
}

type groupSubmittableSet = keyof AugmentedSubmittables<'rxjs'> &
  ('forumWorkingGroup' | 'storageWorkingGroup' | 'contentDirectoryWorkingGroup' | 'membershipWorkingGroup')

const groupExtrinsics: {
  [key in keyof typeof groupNames]: groupSubmittableSet
} = {
  forum: 'forumWorkingGroup',
  storage: 'storageWorkingGroup',
  content: 'contentDirectoryWorkingGroup',
  membership: 'membershipWorkingGroup',
}
