export * from './statuses'
export * from './routes'

export const GroupIdToGroupParam = {
  contentWorkingGroup: 'Content',
  forumWorkingGroup: 'Forum',
  appWorkingGroup: 'App',
  membershipWorkingGroup: 'Membership',
  distributionWorkingGroup: 'Distribution',
  storageWorkingGroup: 'Storage',
  operationsWorkingGroupAlpha: 'Builders',
  operationsWorkingGroupBeta: 'HR',
  operationsWorkingGroupGamma: 'Marketing',
} as const
