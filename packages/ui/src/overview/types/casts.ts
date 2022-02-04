import { GetSidebarInfoQuery } from '@/overview/queries/__generated__/overview.generated'
import {
  OverviewSidebarApplication,
  OverviewSidebarInformations,
  OverviewSidebarProposal,
  OverviewSidebarRole,
  OverviewSidebarThread,
} from '@/overview/types/Overview'
import { asWorkingGroupName } from '@/working-groups/types'

const asOverviewSidebarProposal = (data: GetSidebarInfoQuery['proposals'][number]): OverviewSidebarProposal => ({
  status: data.status.__typename,
  title: data.title,
  votes: {
    rejected: data.votes.reduce((prev, next) => (next.voteKind === 'REJECT' ? ++prev : prev), 0),
    approved: data.votes.reduce((prev, next) => (next.voteKind === 'APPROVE' ? ++prev : prev), 0),
  },
})

const asOverviewSidebarRole = (data: GetSidebarInfoQuery['workers'][number]): OverviewSidebarRole => ({
  role: asWorkingGroupName(data.group.name),
  reward: data.payouts.reduce((prev, next) => prev + next.amount.toNumber(), 0),
  isLead: data.isLead,
})

const asOverviewSidebarThread = (data: GetSidebarInfoQuery['forumThreads'][number]): OverviewSidebarThread => ({
  title: data.title,
  numberOfPosts: data.posts.length,
})

const asOverviewSidebarApplication = (
  data: GetSidebarInfoQuery['workingGroupApplications'][number]
): OverviewSidebarApplication => ({
  group: asWorkingGroupName(data.opening.group.name),
  expectedEndingDate: data.opening.metadata.expectedEnding,
})

export const asOverviewSidebarInformation = (data: GetSidebarInfoQuery): OverviewSidebarInformations => ({
  candidatures: data.candidates.map((candidate) => candidate.electionRound.cycleId),
  applications: data.workingGroupApplications.map(asOverviewSidebarApplication),
  proposals: data.proposals.map(asOverviewSidebarProposal),
  roles: data.workers.map(asOverviewSidebarRole),
  threads: data.forumThreads.map(asOverviewSidebarThread),
  isCouncil: true,
})
