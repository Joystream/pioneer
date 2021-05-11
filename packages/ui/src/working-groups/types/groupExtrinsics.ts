import { AugmentedSubmittables } from '@polkadot/api/types'

enum groupNames {
  forum,
  storage,
  content,
  membership,
}
type groupSubmittableSet = keyof AugmentedSubmittables<'rxjs'> &
  ('forumWorkingGroup' | 'storageWorkingGroup' | 'contentDirectoryWorkingGroup' | 'membershipWorkingGroup')

export const groupExtrinsics: {
  [key in keyof typeof groupNames]: groupSubmittableSet
} = {
  forum: 'forumWorkingGroup',
  storage: 'storageWorkingGroup',
  content: 'contentDirectoryWorkingGroup',
  membership: 'membershipWorkingGroup',
}
