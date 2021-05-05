const knownRoutes = [
  { path: '/profile', breadcrumb: 'My Profile' },
  { path: '/profile/memberships', breadcrumb: 'My Memberships' },
  { path: '/working-groups', breadcrumb: 'Working Groups' },
  { path: '/working-groups/openings', breadcrumb: 'Openings' },
  { path: '/working-groups/my-applications', breadcrumb: 'My Applications' },
  { path: '/working-groups/my-roles', breadcrumb: 'My Roles' },
  { path: '/members', breadcrumb: 'Members' },
]

const excludePaths = ['/', '/working-groups/grouppreview']

export const breadcrumbsOptions: BreadcrumbsOptions = { knownRoutes, excludePaths }

export interface BreadcrumbsOptions {
  knownRoutes: { path: string; breadcrumb: string }[]
  excludePaths: string[]
}
