import { GetSidebarInfoQuery } from '@/overview/queries/__generated__/overview.generated'
import {
  OverviewSidebarInformations,
  OverviewSidebarProposal,
  OverviewSidebarRole,
  OverviewSidebarThread,
} from '@/overview/types/Overview'

const asOverviewSidebarProposal = (data: GetSidebarInfoQuery['proposals'][number]): OverviewSidebarProposal => ({
  status: data.status.__typename,
  title: data.title,
  votes: data.votes.map((vote) => (vote.voteKind === 'APPROVE' ? 'approved' : 'rejected')),
})

const asOverviewSidebarRole = (data: GetSidebarInfoQuery['workers'][number]): OverviewSidebarRole => ({
  role: data.group.name,
  reward: data.payouts.reduce((prev, next) => prev + next.amount.toNumber(), 0),
  isLead: data.isLead,
})

const asOverviewSidebarThread = (data: GetSidebarInfoQuery['forumThreads'][number]): OverviewSidebarThread => ({
  title: data.title,
  numberOfPosts: data.posts.length,
})

export const asOverviewSidebarInformation = (data: GetSidebarInfoQuery): OverviewSidebarInformations => ({
  candidatures: data.candidates.map((candidate) => candidate.electionRound.cycleId),
  applications: data.workingGroupApplications.map((application) => application.opening.group.name),
  proposals: data.proposals.map(asOverviewSidebarProposal),
  roles: data.workers.map(asOverviewSidebarRole),
  threads: data.forumThreads.map(asOverviewSidebarThread),
})
