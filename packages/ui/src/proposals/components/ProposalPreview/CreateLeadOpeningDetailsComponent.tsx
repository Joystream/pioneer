import BN from 'bn.js'
import React from 'react'

import { StatisticItem, Statistics } from '@/common/components/statistics'
import { TextBig, TokenValue } from '@/common/components/typography'
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
        <StatisticItem title="Working group">
          <TextBig>{capitalizeFirstLetter(name)}</TextBig>
        </StatisticItem>
        <StatisticItem title="Stake amount">
          <TextBig>
            <TokenValue value={details.stakeAmount} />
          </TextBig>
        </StatisticItem>
        <StatisticItem title="Unstaking period">
          <TextBig>{details.unstakingPeriod.toString()} blocks</TextBig>
        </StatisticItem>
      </Statistics>
      <Statistics>
        <StatisticItem title={`Reward per ${rewardPeriod.toString()} blocks`}>
          <TextBig>
            <TokenValue value={payoutAmount} />
          </TextBig>
        </StatisticItem>
        <StatisticItem title="Description">
          <TextBig>Opening Description</TextBig>
        </StatisticItem>
      </Statistics>
    </>
  )
}
