import { LockType } from '@/accounts/types'
import { GroupIdName } from '@/working-groups/types/WorkingGroup'

const GROUP_TO_LOCK_ID: Record<GroupIdName, LockType> = {
  forumWorkingGroup: 'Forum Worker',
  contentDirectoryWorkingGroup: 'Content Directory Worker',
  membershipWorkingGroup: 'Membership Worker',
  storageWorkingGroup: 'Storage Worker',
  gatewayWorkingGroup: 'Gateway Worker',
  operationsWorkingGroup: 'Operations Worker',
}

export const groupToLockId = (groupName: GroupIdName): LockType => {
  return GROUP_TO_LOCK_ID[groupName]
}
