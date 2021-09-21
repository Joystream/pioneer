import { CouncilRoutes } from '@/council/constants'
import { ForumRoutes } from '@/forum/constant'
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
  { path: CouncilRoutes.pastCouncils, breadcrumb: 'Past Councils' },
  { path: CouncilRoutes.pastElections, breadcrumb: 'Past Elections' },
  { path: CouncilRoutes.pastVotes, breadcrumb: 'Past Votes' },
  { path: ForumRoutes.latestThreads, breadcrumb: 'Latest Threads' },
  { path: ForumRoutes.myThreads, breadcrumb: 'My Threads' },
  { path: ForumRoutes.topThreads, breadcrumb: 'Top Threads' },
]

const excludePaths = ['/', WorkingGroupsRoutes.upcomingOpenings, ProposalsRoutes.preview]

export const breadcrumbsOptions: BreadcrumbsOptions = { knownRoutes, excludePaths }

export interface BreadcrumbsOptions {
  knownRoutes: { path: string; breadcrumb: string }[]
  excludePaths: string[]
}
