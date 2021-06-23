import BN from 'bn.js'

import { asBlock } from '@/common/types'
import { asMember } from '@/memberships/types'
import { typenameToProposalDetails } from '@/proposals/model/proposalDetails'
import { isProposalActive, typenameToProposalStatus } from '@/proposals/model/proposalStatus'
import { ProposalFieldsFragment } from '@/proposals/queries'
import { Proposal } from '@/proposals/types/proposals'

import { ProposalParameters } from '../../../../types/augment'
import { randomMarkdown } from '../../../dev/scripts/generators/utils'

export interface ProposalConstants {
  votingPeriod: number
  gracePeriod: number
  approvalQuorumPercentage: number
  approvalThresholdPercentage: number
  slashingQuorumPercentage: number
  slashingThresholdPercentage: number
  requiredStake: BN
  constitutionality: number
}

export const asProposalConstants = (params: ProposalParameters): ProposalConstants => ({
  votingPeriod: params.votingPeriod.toNumber(),
  gracePeriod: params.gracePeriod.toNumber(),
  approvalQuorumPercentage: params.approvalQuorumPercentage.toNumber(),
  approvalThresholdPercentage: params.approvalThresholdPercentage.toNumber(),
  slashingQuorumPercentage: params.slashingQuorumPercentage.toNumber(),
  slashingThresholdPercentage: params.slashingThresholdPercentage.toNumber(),
  requiredStake: new BN(params.requiredStake.toString()),
  constitutionality: params.constitutionality.toNumber(),
})
