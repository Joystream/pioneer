import { OpeningMetadata } from '@joystream/metadata-protobuf'
import BN from 'bn.js'

import { createType } from '@/common/model/createType'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { GroupIdName } from '@/working-groups/types'

import { CreateOpeningForm } from './types'

export const getTxParams = (group: GroupIdName, specifics: CreateOpeningForm) => ({
  description: metadataToBytes(OpeningMetadata, {
    title: specifics?.workingGroupAndDescription?.title,
    shortDescription: specifics?.workingGroupAndDescription?.shortDescription,
    description: specifics?.workingGroupAndDescription?.description,
    hiringLimit: specifics?.durationAndProcess?.target,
    expectedEndingTimestamp: specifics?.durationAndProcess?.isLimited
      ? specifics.durationAndProcess?.duration
      : undefined,
    applicationDetails: specifics?.durationAndProcess?.details,
    applicationFormQuestions: specifics?.applicationForm?.questions?.map(({ questionField, shortValue }) => ({
      question: questionField,
      type: OpeningMetadata.ApplicationFormQuestion.InputType[shortValue ? 'TEXT' : 'TEXTAREA'],
    })),
  }),
  openingType: 'Regular',
  stakePolicy: createType('PalletWorkingGroupStakePolicy', {
    stakeAmount: specifics?.stakingPolicyAndReward?.stakingAmount,
    leavingUnstakingPeriod: specifics?.stakingPolicyAndReward?.leavingUnstakingPeriod,
  }),
  rewardPerBlock: new BN(specifics?.stakingPolicyAndReward?.rewardPerBlock).toNumber(),
  group,
})
