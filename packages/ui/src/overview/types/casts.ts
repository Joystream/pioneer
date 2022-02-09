import { GetSidebarInfoQuery } from '@/overview/queries/__generated__/overview.generated'
import {
  OverviewSidebarApplication,
  OverviewSidebarCandidacy,
  OverviewSidebarInformations,
  OverviewSidebarRole,
  OverviewSidebarThread,
} from '@/overview/types/Overview'
import { asWorkingGroupName } from '@/working-groups/types'

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

const asOverviewSidebarCandidacy = (
  data: GetSidebarInfoQuery['candidacyNoteMetadata'][number]
): OverviewSidebarCandidacy => ({
  title: data.header || 'Title',
  id: data.id,
})

export const asOverviewSidebarInformation = (data: GetSidebarInfoQuery): OverviewSidebarInformations => ({
  candidatures: data.candidacyNoteMetadata.map(asOverviewSidebarCandidacy),
  applications: data.workingGroupApplications.map(asOverviewSidebarApplication),
  proposals: data.proposals.map((proposal) => proposal.id),
  roles: data.workers.map(asOverviewSidebarRole),
  threads: data.forumThreads.map(asOverviewSidebarThread),
  isCouncil: !!data.councilMembers.length,
})
