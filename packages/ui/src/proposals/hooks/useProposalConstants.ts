import { u128, u32 } from '@polkadot/types'
import { PalletProposalsEngineProposalParameters } from '@polkadot/types/lookup'
import { useMemo } from 'react'

import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { asProposalConstants, ProposalConstants } from '@/proposals/types/constants'

import { ProposalType } from '../types'

export const useProposalConstants = (proposalType?: ProposalType): ProposalConstants | null => {
  const { api, isConnected } = useApi()

  return useMemo(() => proposalConstants(api, proposalType), [proposalType, isConnected])
}

export const proposalConstants = (api?: Pick<Api, 'consts'>, proposalType?: ProposalType) => {
  if (!proposalType) {
    return null
  }

  const constantKey = proposalTypeToConstantKey.get(proposalType)

  if (!constantKey) {
    return null
  }
  const constants = api?.consts.proposalsCodex[constantKey]

  return constants && extendsProposalPallet(constants) ? asProposalConstants(constants) : null
}

const extendsProposalPallet = (
  proposalType: PalletProposalsEngineProposalParameters | u32 | u128
): proposalType is PalletProposalsEngineProposalParameters =>
  !(proposalType instanceof u128 || proposalType instanceof u32)

const proposalTypeToConstantKey = new Map<ProposalType, keyof Api['consts']['proposalsCodex']>([
  ['updateChannelPayouts', 'updateChannelPayoutsProposalParameters'],
  ['amendConstitution', 'amendConstitutionProposalParameters'],
  ['cancelWorkingGroupLeadOpening', 'cancelWorkingGroupLeadOpeningProposalParameters'],
  ['createWorkingGroupLeadOpening', 'createWorkingGroupLeadOpeningProposalParameters'],
  ['decreaseWorkingGroupLeadStake', 'decreaseWorkingGroupLeadStakeProposalParameters'],
  ['fillWorkingGroupLeadOpening', 'fillWorkingGroupOpeningProposalParameters'],
  ['fundingRequest', 'fundingRequestProposalParameters'],
  ['runtimeUpgrade', 'runtimeUpgradeProposalParameters'],
  ['setCouncilBudgetIncrement', 'setCouncilBudgetIncrementProposalParameters'],
  ['setCouncilorReward', 'setCouncilorRewardProposalParameters'],
  ['setInitialInvitationBalance', 'setInitialInvitationBalanceProposalParameters'],
  ['setInitialInvitationCount', 'setInvitationCountProposalParameters'],
  ['setMaxValidatorCount', 'setMaxValidatorCountProposalParameters'],
  ['setMembershipLeadInvitationQuota', 'setMembershipLeadInvitationQuotaProposalParameters'],
  ['setMembershipPrice', 'setMembershipPriceProposalParameters'],
  ['setReferralCut', 'setReferralCutProposalParameters'],
  ['setWorkingGroupLeadReward', 'setWorkingGroupLeadRewardProposalParameters'],
  ['signal', 'signalProposalParameters'],
  ['slashWorkingGroupLead', 'slashWorkingGroupLeadProposalParameters'],
  ['terminateWorkingGroupLead', 'terminateWorkingGroupLeadProposalParameters'],
  ['updateWorkingGroupBudget', 'updateWorkingGroupBudgetProposalParameters'],
  ['veto', 'vetoProposalProposalParameters'],
])
