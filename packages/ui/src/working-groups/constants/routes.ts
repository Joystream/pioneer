export const WorkingGroupsRoutes = {
  groups: '/working-groups',
  group: '/working-groups/:name',
  openings: '/working-groups/openings',
  openingById: '/working-groups/openings/:id',
  upcomingOpenings: '/working-groups/openings/upcoming/:id',
  myApplications: '/working-groups/my-applications',
  myRoles: '/working-groups/my-roles',
  myRole: '/working-groups/my-roles/:id',
} as const

type WorkingGroupsRoutesType = typeof WorkingGroupsRoutes

declare module '@/app/constants/routes' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Routes extends WorkingGroupsRoutesType {}
}
