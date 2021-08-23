import React from 'react'

import { TextBig, TextInlineBig } from '@/common/components/typography'
import { capitalizeFirstLetter } from '@/common/helpers'
import { MemberInfo } from '@/memberships/components'

import { StatisticItem, Statistics, TokenValueStat } from '../../../common/components/statistics'
import { DecreaseLeadStakeDetails, SlashLeadDetails } from '../../types/ProposalDetails'

import { ProposalPropertiesContent } from './ProposalDetails'

interface Props {
  details: DecreaseLeadStakeDetails | SlashLeadDetails
}
export const LeadStakeComponent: ProposalPropertiesContent<
  'decreaseWorkingGroupLeadStake' | 'slashWorkingGroupLead'
> = ({ details }: Props) => {
  const member = details.member
  const amountText = details.type === 'decreaseWorkingGroupLeadStake' ? 'Decrease Stake Amount' : 'Slashing Amount'

  return (
    <Statistics>
      <StatisticItem title="Working Group">
        <TextInlineBig bold value>
          {capitalizeFirstLetter(details.groupName)}
        </TextInlineBig>
      </StatisticItem>
      <StatisticItem title="Worker ID">
        {member ? <MemberInfo member={member} showGroup /> : <TextBig>Unknown</TextBig>}
      </StatisticItem>
      <TokenValueStat title={amountText} value={details.amount} />
    </Statistics>
  )
}
