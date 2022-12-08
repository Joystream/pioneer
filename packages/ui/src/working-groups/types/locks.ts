import { LockType } from '@/accounts/types'
import { GroupIdName } from '@/working-groups/types/WorkingGroup'

const GROUP_TO_LOCK_ID: Record<GroupIdName, LockType> = {
  forumWorkingGroup: 'Forum Worker',
  contentWorkingGroup: 'Content Directory Worker',
  membershipWorkingGroup: 'Membership Worker',
  storageWorkingGroup: 'Storage Worker',
  appWorkingGroup: 'Apps Worker',
  distributionWorkingGroup: 'Distribution Worker',
  operationsWorkingGroupGamma: 'Builders Worker',
  operationsWorkingGroupBeta: 'HR Worker',
  operationsWorkingGroupAlpha: 'Marketing Worker',
}

export const groupToLockId = (groupName: GroupIdName): LockType => {
  return GROUP_TO_LOCK_ID[groupName]
}
