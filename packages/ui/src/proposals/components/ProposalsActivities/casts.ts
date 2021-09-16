import { ProposalStatus } from '@/common/api/queries'
import { asBaseActivity, asMemberDisplayFields } from '@/common/types'
import {
  ProposalCreatedEventFieldsFragment,
  ProposalStatusUpdatedEventFieldsFragment,
} from '@/proposals/queries/__generated__/proposalsEvents.generated'

import { ProposalCreatedActivity, ProposalStatusUpdatedActivity } from './types'

const asProposalFields = (fields: { id: string; title: string }) => ({
  id: fields.id,
  title: fields.title,
})

const asProposalStatusName = (name: ProposalStatus['__typename']) => name.replace('ProposalStatus', '')

export const asProposalCreatedActivity = (fields: ProposalCreatedEventFieldsFragment): ProposalCreatedActivity => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
  proposal: asProposalFields(fields.proposal),
  creator: asMemberDisplayFields(fields.proposal.creator),
})

export const asProposalStatusUpdatedActivity = (
  fields: ProposalStatusUpdatedEventFieldsFragment
): ProposalStatusUpdatedActivity => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
  proposal: asProposalFields(fields.proposal),
  newStatus: asProposalStatusName(fields.newStatus.__typename),
})
