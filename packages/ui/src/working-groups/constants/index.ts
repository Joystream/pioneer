export * from './statuses'
export * from './routes'

export const GroupIdToGroupParam = {
  contentWorkingGroup: 'Content',
  forumWorkingGroup: 'Forum',
  gatewayWorkingGroup: 'Gateway',
  membershipWorkingGroup: 'Membership',
  distributionWorkingGroup: 'Distribution',
  storageWorkingGroup: 'Storage',
  operationsWorkingGroupAlpha: 'OperationsAlpha',
  operationsWorkingGroupBeta: 'OperationsBeta',
  operationsWorkingGroupGamma: 'OperationsGamma',
} as const
