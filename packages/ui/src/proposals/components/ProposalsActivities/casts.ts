import { ProposalStatus } from '@/common/api/queries'
import { asBaseActivity, asMemberDisplayFields } from '@/common/types'
import {
  GetProposalsEventsQuery,
  ProposalCreatedEventFieldsFragment,
  ProposalDecisionMadeEventFieldsFragment,
  ProposalStatusUpdatedEventFieldsFragment,
} from '@/proposals/queries/__generated__/proposalsEvents.generated'

import {
  ProposalActivity,
  ProposalCreatedActivity,
  ProposalDecisionMadeActivity,
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

const asProposalCreatedActivity: ProposalActivityCast<ProposalCreatedEventFieldsFragment, ProposalCreatedActivity> = (
  fields
) => ({
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

const proposalCastByType: Record<
  ProposalEventFieldsFragment['__typename'],
  ProposalActivityCast<any, ProposalActivity>
> = {
  ProposalCreatedEvent: asProposalCreatedActivity,
  ProposalStatusUpdatedEvent: asProposalStatusUpdatedActivity,
  ProposalDecisionMadeEvent: asProposalDecisionMadeActivity,
}

type EventsQueryResult = GetProposalsEventsQuery['events'][0]

const isProposalEvent = (fields: EventsQueryResult): fields is ProposalEventFieldsFragment =>
  ['ProposalCreatedEvent', 'ProposalStatusUpdatedEvent', 'ProposalDecisionMadeEvent'].includes(fields.__typename)

export const asProposalActivities = (events: EventsQueryResult[]) =>
  events.filter(isProposalEvent).map((eventFields) => proposalCastByType[eventFields.__typename](eventFields))
