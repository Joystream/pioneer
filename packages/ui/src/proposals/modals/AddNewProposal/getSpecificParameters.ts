import { OpeningMetadata } from '@joystream/metadata-protobuf'

import { Api } from '@/api'
import { BN_ZERO } from '@/common/constants'
import { createType } from '@/common/model/createType'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { last } from '@/common/utils'
import { asArrayBuffer } from '@/common/utils/file'
import { AddNewProposalForm } from '@/proposals/modals/AddNewProposal/helpers'
import { GroupIdToGroupParam } from '@/working-groups/constants'
import { GroupIdName } from '@/working-groups/types'

const idToRuntimeId = (id: string): number => Number(last(id.split('-')))

const getWorkingGroupParam = (groupId: GroupIdName | undefined) => groupId && GroupIdToGroupParam[groupId]

export const getSpecificParameters = async (
  api: Api,
  specifics: Omit<AddNewProposalForm, 'triggerAndDiscussion' | 'stakingAccount' | 'proposalDetails'>
) => {
  if (!specifics.proposalType.type) {
    return createType('PalletProposalsCodexProposalDetails', { Signal: '' })
  }

  switch (specifics.proposalType.type) {
    case 'signal': {
      return createType('PalletProposalsCodexProposalDetails', {
        Signal: createType('Text', specifics.signal?.signal ?? ''),
      })
    }
    case 'fundingRequest': {
      return createType('PalletProposalsCodexProposalDetails', {
        FundingRequest: specifics?.fundingRequest?.payMultiple
          ? specifics?.fundingRequest?.accountsAndAmounts
          : [{ amount: specifics?.fundingRequest?.amount, account: specifics?.fundingRequest?.account?.address }],
      })
    }
    case 'runtimeUpgrade': {
      const u8a = new Uint8Array(await asArrayBuffer(specifics?.runtimeUpgrade?.runtime))
      return createType('PalletProposalsCodexProposalDetails', {
        RuntimeUpgrade: createType('Bytes', u8a),
      })
    }
    case 'createWorkingGroupLeadOpening': {
      return createType('PalletProposalsCodexProposalDetails', {
        CreateWorkingGroupLeadOpening: {
          description: metadataToBytes(OpeningMetadata, {
            title: specifics?.workingGroupAndDescription?.title,
            shortDescription: specifics?.workingGroupAndDescription?.shortDescription,
            description: specifics?.workingGroupAndDescription?.description,
            hiringLimit: 1,
            expectedEndingTimestamp: specifics?.durationAndProcess?.isLimited
              ? specifics.durationAndProcess?.duration
              : undefined,
            applicationDetails: specifics?.durationAndProcess?.details,
            applicationFormQuestions: specifics?.applicationForm?.questions?.map(({ questionField, shortValue }) => ({
              question: questionField,
              type: OpeningMetadata.ApplicationFormQuestion.InputType[shortValue ? 'TEXT' : 'TEXTAREA'],
            })),
          }),
          stakePolicy: {
            stakeAmount: specifics?.stakingPolicyAndReward?.stakingAmount,
            leavingUnstakingPeriod: specifics?.stakingPolicyAndReward?.leavingUnstakingPeriod,
          },
          rewardPerBlock: specifics?.stakingPolicyAndReward?.rewardPerBlock,
          group: getWorkingGroupParam(specifics?.workingGroupAndDescription?.groupId),
        },
      })
    }
    case 'decreaseWorkingGroupLeadStake': {
      return createType('PalletProposalsCodexProposalDetails', {
        DecreaseWorkingGroupLeadStake: [
          specifics?.decreaseWorkingGroupLeadStake?.workerId ?? 0,
          specifics?.decreaseWorkingGroupLeadStake?.stakingAmount ?? BN_ZERO,
          getWorkingGroupParam(specifics?.decreaseWorkingGroupLeadStake?.groupId) ?? 'Distribution',
        ],
      })
    }
    case 'slashWorkingGroupLead': {
      return createType('PalletProposalsCodexProposalDetails', {
        SlashWorkingGroupLead: [
          specifics?.slashWorkingGroupLead?.workerId ?? 0,
          specifics?.slashWorkingGroupLead?.slashingAmount ?? BN_ZERO,
          getWorkingGroupParam(specifics?.slashWorkingGroupLead?.groupId) ?? 'Distribution',
        ],
      })
    }
    case 'terminateWorkingGroupLead': {
      return createType('PalletProposalsCodexProposalDetails', {
        TerminateWorkingGroupLead: {
          workerId: specifics?.terminateWorkingGroupLead?.workerId,
          group: getWorkingGroupParam(specifics?.terminateWorkingGroupLead?.groupId),
          slashingAmount: specifics?.terminateWorkingGroupLead?.slashingAmount,
        },
      })
    }
    case 'setWorkingGroupLeadReward': {
      return createType('PalletProposalsCodexProposalDetails', {
        SetWorkingGroupLeadReward: [
          specifics?.setWorkingGroupLeadReward?.workerId ?? 0,
          specifics?.setWorkingGroupLeadReward?.rewardPerBlock,
          getWorkingGroupParam(specifics?.setWorkingGroupLeadReward?.groupId) ?? 'Distribution',
        ],
      })
    }
    case 'cancelWorkingGroupLeadOpening': {
      return createType('PalletProposalsCodexProposalDetails', {
        CancelWorkingGroupLeadOpening: [
          specifics?.cancelWorkingGroupLeadOpening?.openingId
            ? idToRuntimeId(specifics.cancelWorkingGroupLeadOpening?.openingId)
            : 0,
          getWorkingGroupParam(specifics?.cancelWorkingGroupLeadOpening?.groupId) ?? 'Distribution',
        ],
      })
    }
    case 'setCouncilorReward': {
      return createType('PalletProposalsCodexProposalDetails', {
        SetCouncilorReward: specifics?.setCouncilorReward?.amount ?? BN_ZERO,
      })
    }
    case 'setCouncilBudgetIncrement': {
      return createType('PalletProposalsCodexProposalDetails', {
        SetCouncilBudgetIncrement: specifics?.setCouncilBudgetIncrement?.amount ?? BN_ZERO,
      })
    }
    case 'fillWorkingGroupLeadOpening': {
      return createType('PalletProposalsCodexProposalDetails', {
        FillWorkingGroupLeadOpening: {
          openingId: specifics?.fillWorkingGroupLeadOpening?.openingId
            ? idToRuntimeId(specifics.fillWorkingGroupLeadOpening?.openingId)
            : 0,
          applicationId: specifics?.fillWorkingGroupLeadOpening?.applicationId
            ? idToRuntimeId(specifics.fillWorkingGroupLeadOpening?.applicationId)
            : 0,
          // Looks like name for wg parameter on fill wg lead opening differ for the rest, hance the change
          workingGroup: getWorkingGroupParam(specifics?.fillWorkingGroupLeadOpening?.groupId),
        },
      })
    }
    case 'updateWorkingGroupBudget': {
      return createType('PalletProposalsCodexProposalDetails', {
        UpdateWorkingGroupBudget: [
          specifics?.updateWorkingGroupBudget?.budgetUpdate ?? BN_ZERO,
          getWorkingGroupParam(specifics?.updateWorkingGroupBudget?.groupId) ?? 'Distribution',
          specifics?.updateWorkingGroupBudget.isPositive ? 'Positive' : 'Negative',
        ],
      })
    }
    case 'setMembershipLeadInvitationQuota': {
      return createType('PalletProposalsCodexProposalDetails', {
        SetMembershipLeadInvitationQuota: specifics?.setMembershipLeadInvitationQuota?.count ?? 0,
      })
    }
    case 'setReferralCut': {
      return createType('PalletProposalsCodexProposalDetails', {
        SetReferralCut: specifics?.setReferralCut?.referralCut ?? 0,
      })
    }
    case 'setInitialInvitationBalance': {
      return createType('PalletProposalsCodexProposalDetails', {
        SetInitialInvitationBalance: specifics?.setInitialInvitationBalance?.amount ?? BN_ZERO,
      })
    }
    case 'setInitialInvitationCount': {
      return createType('PalletProposalsCodexProposalDetails', {
        SetInitialInvitationCount: specifics?.setInitialInvitationCount?.invitationCount ?? 0,
      })
    }
    case 'setMaxValidatorCount': {
      return createType('PalletProposalsCodexProposalDetails', {
        SetMaxValidatorCount: specifics?.setMaxValidatorCount?.validatorCount?.toNumber() ?? 0,
      })
    }
    case 'setMembershipPrice': {
      return createType('PalletProposalsCodexProposalDetails', {
        SetMembershipPrice: specifics?.setMembershipPrice?.amount ?? 0,
      })
    }
    case 'updateChannelPayouts': {
      return createType('PalletProposalsCodexProposalDetails', {
        UpdateChannelPayouts: {
          payload: specifics?.updateChannelPayouts.payload ?? null,
          minCashoutAllowed: specifics?.updateChannelPayouts.minimumCashoutAllowed,
          maxCashoutAllowed: specifics?.updateChannelPayouts.maximumCashoutAllowed,
          channelCashoutsEnabled: specifics.updateChannelPayouts.cashoutEnabled ?? false,
          commitment: specifics.updateChannelPayouts.commitment ?? null,
        },
      })
    }
    default:
      return createType('PalletProposalsCodexProposalDetails', { Signal: '' })
  }
}
