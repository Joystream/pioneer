import { AugmentedSubmittables } from '@polkadot/api/types'

import { GroupName } from '.'

type groupSubmittableSet = keyof AugmentedSubmittables<'rxjs'> &
  ('forumWorkingGroup' | 'storageWorkingGroup' | 'contentDirectoryWorkingGroup' | 'membershipWorkingGroup')

export const groupExtrinsics: Record<GroupName, groupSubmittableSet> = {
  forum: 'forumWorkingGroup',
  storage: 'storageWorkingGroup',
  content: 'contentDirectoryWorkingGroup',
  membership: 'membershipWorkingGroup',
}
