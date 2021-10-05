import { AugmentedSubmittables } from '@polkadot/api/types'

import { GroupName } from '.'

type groupSubmittableSet = keyof AugmentedSubmittables<'rxjs'> &
  (
    | 'forumWorkingGroup'
    | 'storageWorkingGroup'
    | 'contentDirectoryWorkingGroup'
    | 'membershipWorkingGroup'
    | 'gatewayWorkingGroup'
    | 'operationsWorkingGroup'
  )

export const groupExtrinsics: Record<GroupName, groupSubmittableSet> = {
  forum: 'forumWorkingGroup',
  storage: 'storageWorkingGroup',
  'content directory': 'contentDirectoryWorkingGroup',
  membership: 'membershipWorkingGroup',
  gateway: 'gatewayWorkingGroup',
  operations: 'operationsWorkingGroup',
}
