import { ProposalStatus } from '@/common/api/queries'
import { asBaseActivity, asMemberDisplayFields } from '@/common/types'
import {
  GetProposalsEventsQuery,
  ProposalCancelledEventFieldsFragment,
  ProposalCreatedEventFieldsFragment,
  ProposalDecisionMadeEventFieldsFragment,
  ProposalDiscussionModeChangedEventFieldsFragment,
  ProposalDiscussionPostCreatedEventFieldsFragment,
  ProposalDiscussionPostDeletedEventFieldsFragment,
  ProposalDiscussionPostUpdatedEventFieldsFragment,
  ProposalExecutedEventFieldsFragment,
  ProposalStatusUpdatedEventFieldsFragment,
  ProposalVotedEventFieldsFragment,
} from '@/proposals/queries/__generated__/proposalsEvents.generated'

import {
  ProposalCancelledActivity,
  ProposalDiscussionModeChangedActivity,
  ProposalDiscussionPostCreatedActivity,
  ProposalExecutedActivity,
  ProposalVotedActivity,
} from '.'
import {
  ProposalActivity,
  ProposalCreatedActivity,
  ProposalDecisionMadeActivity,
  ProposalDiscussionPostDeletedActivity,
  ProposalDiscussionPostEditedActivity,
  ProposalEventFieldsFragment,
  ProposalStatusUpdatedActivity,
} from './types'

const asProposalFields = (fields: { id: string; title: string }) => ({
  id: fields.id,
  title: fields.title,
})

const asProposalStatusName = (name: ProposalStatus['__typename']) => name.replace('ProposalStatus', '')

interface ProposalActivityCast<Fields, Activity extends ProposalActivity> {
  (fields: Fields): Activity
}

const asProposalCreatedOrCancelledActivity: ProposalActivityCast<
  ProposalCreatedEventFieldsFragment | ProposalCancelledEventFieldsFragment,
  ProposalCreatedActivity | ProposalCancelledActivity
> = (fields) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
  proposal: asProposalFields(fields.proposal),
  creator: asMemberDisplayFields(fields.proposal.creator),
})

const asProposalStatusUpdatedActivity: ProposalActivityCast<
  ProposalStatusUpdatedEventFieldsFragment,
  ProposalStatusUpdatedActivity
> = (fields) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
  proposal: asProposalFields(fields.proposal),
  newStatus: asProposalStatusName(fields.newStatus.__typename),
})

const asProposalDecisionMadeActivity: ProposalActivityCast<
  ProposalDecisionMadeEventFieldsFragment,
  ProposalDecisionMadeActivity
> = (fields) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
  proposal: asProposalFields(fields.proposal),
})

const asProposalDiscussionModeChangedActivity: ProposalActivityCast<
  ProposalDiscussionModeChangedEventFieldsFragment,
  ProposalDiscussionModeChangedActivity
> = (fields) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
  proposal: asProposalFields(fields.thread.proposal),
  newMode: fields.newMode.__typename === 'ProposalDiscussionThreadModeClosed' ? 'closed' : 'open',
})

const asProposalExecutedActivity: ProposalActivityCast<
  ProposalExecutedEventFieldsFragment,
  ProposalExecutedActivity
> = (fields) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
  proposal: asProposalFields(fields.proposal),
  executedSuccessfully: fields.executionStatus.__typename === 'ProposalStatusExecuted',
})

const asProposalVotedActivity: ProposalActivityCast<ProposalVotedEventFieldsFragment, ProposalVotedActivity> = (
  fields
) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
  voter: asMemberDisplayFields(fields.voter),
  proposal: asProposalFields(fields.proposal),
})

const asDiscussionPostActivity: ProposalActivityCast<
  | ProposalDiscussionPostCreatedEventFieldsFragment
  | ProposalDiscussionPostUpdatedEventFieldsFragment
  | ProposalDiscussionPostDeletedEventFieldsFragment,
  ProposalDiscussionPostCreatedActivity | ProposalDiscussionPostEditedActivity | ProposalDiscussionPostDeletedActivity
> = (fields) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
  proposal: asProposalFields(fields.post.discussionThread.proposal),
  author: asMemberDisplayFields(fields.post.author),
  postId: fields.post.id,
})

const proposalCastByType: Record<
  ProposalEventFieldsFragment['__typename'],
  ProposalActivityCast<any, ProposalActivity>
> = {
  ProposalCreatedEvent: asProposalCreatedOrCancelledActivity,
  ProposalCancelledEvent: asProposalCreatedOrCancelledActivity,
  ProposalStatusUpdatedEvent: asProposalStatusUpdatedActivity,
  ProposalDecisionMadeEvent: asProposalDecisionMadeActivity,
  ProposalDiscussionThreadModeChangedEvent: asProposalDiscussionModeChangedActivity,
  ProposalExecutedEvent: asProposalExecutedActivity,
  ProposalVotedEvent: asProposalVotedActivity,
  ProposalDiscussionPostCreatedEvent: asDiscussionPostActivity,
  ProposalDiscussionPostUpdatedEvent: asDiscussionPostActivity,
  ProposalDiscussionPostDeletedEvent: asDiscussionPostActivity,
}

type EventsQueryResult = GetProposalsEventsQuery['events'][0]

const isProposalEvent = (fields: EventsQueryResult): fields is ProposalEventFieldsFragment =>
  fields.__typename in proposalCastByType

export const asProposalActivities = (events: EventsQueryResult[]) =>
  events.filter(isProposalEvent).map((eventFields) => proposalCastByType[eventFields.__typename](eventFields))
