import BN from 'bn.js'
import React from 'react'

import { StatisticItem, Statistics } from '@/common/components/statistics'
import { TextBig, TextMedium, TokenValue } from '@/common/components/typography'
import { capitalizeFirstLetter } from '@/common/helpers'
import { CreateLeadOpeningDetails } from '@/proposals/types/ProposalDetails'
import { GroupRewardPeriods, isKnownGroupName } from '@/working-groups/types'

import { ProposalPropertiesContent } from './ProposalProperties'

interface Props {
  details: CreateLeadOpeningDetails
}

export const CreateLeadOpeningDetailsComponent: ProposalPropertiesContent<'createWorkingGroupLeadOpening'> = ({
  details,
}: Props) => {
  const name = details.group?.name ?? ''
  const rewardPeriod = isKnownGroupName(name) ? GroupRewardPeriods[name] : new BN(1)
  const payoutAmount = rewardPeriod.mul(details.rewardPerBlock)
  return (
    <>
      <Statistics>
        <StatisticItem>
          <TextBig>{capitalizeFirstLetter(name)}</TextBig>
          <TextMedium>Working group</TextMedium>
        </StatisticItem>
        <StatisticItem>
          <TextBig>
            <TokenValue value={details.stakeAmount} />
          </TextBig>
          <TextMedium>Stake amount</TextMedium>
        </StatisticItem>
        <StatisticItem>
          <TextBig>{details.unstakingPeriod.toString()} blocks</TextBig>
          <TextMedium>Unstaking period</TextMedium>
        </StatisticItem>
      </Statistics>
      <Statistics>
        <StatisticItem>
          <TextBig>
            <TokenValue value={payoutAmount} />
          </TextBig>
          <TextMedium>Reward per {rewardPeriod.toString()} blocks</TextMedium>
        </StatisticItem>
        <StatisticItem>
          <TextBig>Opening Description</TextBig>
          <TextMedium>Description</TextMedium>
        </StatisticItem>
      </Statistics>
    </>
  )
}
