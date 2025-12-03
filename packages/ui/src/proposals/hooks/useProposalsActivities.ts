import { useGetProposalsEventsQuery } from '../queries/__generated__/proposalsEvents.generated'
import { asProposalActivities } from '../types/ProposalsActivities'

export const useProposalsActivities = () => {
  const { data, loading } = useGetProposalsEventsQuery()

  const activities = data
    ? asProposalActivities({
        proposalCreatedEvents: data.proposalCreatedEvents,
        proposalCancelledEvents: data.proposalCancelledEvents,
        proposalStatusUpdatedEvents: data.proposalStatusUpdatedEvents,
        proposalDecisionMadeEvents: data.proposalDecisionMadeEvents,
        proposalDiscussionThreadModeChangedEvents: data.proposalDiscussionThreadModeChangedEvents,
        proposalExecutedEvents: data.proposalExecutedEvents,
        proposalVotedEvents: data.proposalVotedEvents,
        proposalDiscussionPostCreatedEvents: data.proposalDiscussionPostCreatedEvents,
        proposalDiscussionPostUpdatedEvents: data.proposalDiscussionPostUpdatedEvents,
        proposalDiscussionPostDeletedEvents: data.proposalDiscussionPostDeletedEvents,
      })
    : []

  return {
    isLoading: loading,
    activities,
  }
}
