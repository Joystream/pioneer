import { AugmentedSubmittables } from '@polkadot/api/types'

export type GroupName = 'forum' | 'storage' | 'content' | 'membership'

type groupSubmittableSet = keyof AugmentedSubmittables<'rxjs'> &
  ('forumWorkingGroup' | 'storageWorkingGroup' | 'contentDirectoryWorkingGroup' | 'membershipWorkingGroup')

export const groupExtrinsics: Record<GroupName, groupSubmittableSet> = {
  forum: 'forumWorkingGroup',
  storage: 'storageWorkingGroup',
  content: 'contentDirectoryWorkingGroup',
  membership: 'membershipWorkingGroup',
}
