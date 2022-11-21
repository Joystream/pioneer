import { BountyRoutes } from '@/bounty/constants'
import { CouncilRoutes, ElectionRoutes } from '@/council/constants'
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
  { path: ElectionRoutes.pastElections, breadcrumb: 'Past Elections' },
  { path: ElectionRoutes.pastVotes, breadcrumb: 'Past Votes' },
  { path: ForumRoutes.myThreads, breadcrumb: 'My Threads' },
  { path: BountyRoutes.myContributions, breadcrumb: 'My Contributions' },
  { path: BountyRoutes.myBounties, breadcrumb: 'My Bounties' },
  { path: BountyRoutes.myEntries, breadcrumb: 'My Entries' },
]

const excludePaths = ['/', WorkingGroupsRoutes.upcomingOpenings, ProposalsRoutes.preview]

export const breadcrumbsOptions: BreadcrumbsOptions = { knownRoutes, excludePaths }

export interface BreadcrumbsOptions {
  knownRoutes: { path: string; breadcrumb: string }[]
  excludePaths: string[]
}
