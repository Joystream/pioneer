import { PalletProposalsEngineProposalParameters } from '@polkadot/types/lookup'
import BN from 'bn.js'

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

export const asProposalConstants = (params: PalletProposalsEngineProposalParameters): ProposalConstants => ({
  votingPeriod: params.votingPeriod.toNumber(),
  gracePeriod: params.gracePeriod.toNumber(),
  approvalQuorumPercentage: params.approvalQuorumPercentage.toNumber(),
  approvalThresholdPercentage: params.approvalThresholdPercentage.toNumber(),
  slashingQuorumPercentage: params.slashingQuorumPercentage.toNumber(),
  slashingThresholdPercentage: params.slashingThresholdPercentage.toNumber(),
  requiredStake: new BN(params.requiredStake.toString()),
  constitutionality: params.constitutionality.toNumber(),
})
