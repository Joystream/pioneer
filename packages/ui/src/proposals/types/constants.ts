import BN from 'bn.js'

import { ProposalParameters } from '../../../../types/augment'

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
