import { ProposalStatus } from '@/common/api/queries'
import { asBaseActivity, asMemberDisplayFields } from '@/common/types'
import {
  GetProposalsEventsQuery,
  ProposalCreatedEventFieldsFragment,
  ProposalStatusUpdatedEventFieldsFragment,
} from '@/proposals/queries/__generated__/proposalsEvents.generated'

import { ProposalActivity, ProposalCreatedActivity, ProposalStatusUpdatedActivity } from './types'

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

type ProposalEventFieldsFragment = ProposalCreatedEventFieldsFragment | ProposalStatusUpdatedEventFieldsFragment

const proposalCastByType: Record<
  ProposalEventFieldsFragment['__typename'],
  ProposalActivityCast<any, ProposalActivity>
> = {
  ProposalCreatedEvent: asProposalCreatedActivity,
  ProposalStatusUpdatedEvent: asProposalStatusUpdatedActivity,
}

type EventsQueryResult = GetProposalsEventsQuery['events'][0]

const isProposalEvent = (fields: EventsQueryResult): fields is ProposalEventFieldsFragment =>
  ['ProposalCreatedEvent', 'ProposalStatusUpdatedEvent'].includes(fields.__typename)

export const asProposalActivities = (events: EventsQueryResult[]) =>
  events.filter(isProposalEvent).map((eventFields) => proposalCastByType[eventFields.__typename](eventFields))
