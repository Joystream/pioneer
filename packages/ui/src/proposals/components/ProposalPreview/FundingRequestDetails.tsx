import React from 'react'

import { StatisticItem, Statistics, TokenValueStat } from '@/common/components/statistics'
import { TextMedium } from '@/common/components/typography'

import { ProposalDetails } from '../../types/ProposalDetails'

interface DestinationProps {
  destination: {
    account: string
    amount: number
  }
}

const FundingRequestDestination = ({ destination }: DestinationProps) => {
  return (
    <Statistics>
      <TokenValueStat title="Amount" value={destination.amount} />
      <StatisticItem title="Account">
        <TextMedium>{destination.account}</TextMedium>
      </StatisticItem>
    </Statistics>
  )
}

interface FundingRequestDetailsProps {
  details: ProposalDetails & { type: 'fundingRequest' }
}

export const FundingRequestDetails = ({ details }: FundingRequestDetailsProps) => {
  return (
    <>
      {details.destinations?.map((destination) => (
        <FundingRequestDestination destination={destination} key={destination.account + destination.amount} />
      ))}
    </>
  )
}
