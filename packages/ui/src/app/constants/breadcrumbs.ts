import { ProposalsRoutes } from '@/proposals/constants/routes'
import { WorkingGroupsRoutes } from '@/working-groups/constants/routes'

const knownRoutes = [
  { path: '/profile', breadcrumb: 'My Profile' },
  { path: '/profile/memberships', breadcrumb: 'My Memberships' },
  { path: WorkingGroupsRoutes.groups, breadcrumb: 'Working Groups' },
  { path: WorkingGroupsRoutes.openings, breadcrumb: 'Openings' },
  { path: WorkingGroupsRoutes.myApplications, breadcrumb: 'My Applications' },
  { path: WorkingGroupsRoutes.myRoles, breadcrumb: 'My Roles' },
  { path: '/members', breadcrumb: 'Members' },
  { path: ProposalsRoutes.current, breadcrumb: 'Current' },
  { path: ProposalsRoutes.past, breadcrumb: 'Past' },
  { path: ProposalsRoutes.myproposals, breadcrumb: 'My Proposals' },
]

const excludePaths = ['/']

export const breadcrumbsOptions: BreadcrumbsOptions = { knownRoutes, excludePaths }

export interface BreadcrumbsOptions {
  knownRoutes: { path: string; breadcrumb: string }[]
  excludePaths: string[]
}
