export const WorkingGroupsRoutes = {
  groups: '/working-groups',
  openings: '/working-groups/openings',
  upcomingOpenings: '/working-groups/openings/upcoming',
  myApplications: '/working-groups/my-applications',
  myRoles: '/working-groups/my-roles',
} as const

type WorkingGroupsRoutesType = typeof WorkingGroupsRoutes

declare module '@/app/constants/routes' {
  // eslint-disable-next-line
  interface Routes extends WorkingGroupsRoutesType {}
}
