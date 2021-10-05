import { LockType } from '@/accounts/types'
import { GroupName } from '@/working-groups/types/WorkingGroup'

const GROUP_TO_LOCK_ID: Record<GroupName, LockType> = {
  forum: 'Forum Worker',
  'content directory': 'Content Directory Worker',
  membership: 'Membership Worker',
  storage: 'Storage Worker',
  gateway: 'Gateway Worker',
  operations: 'Operations Worker',
}

export const groupToLockId = (groupName: GroupName): LockType => {
  return GROUP_TO_LOCK_ID[groupName]
}
