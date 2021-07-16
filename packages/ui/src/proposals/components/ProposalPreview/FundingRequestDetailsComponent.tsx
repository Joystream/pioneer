import React from 'react'

import { CopyButton } from '@/common/components/buttons'
import {
  StatiscticSpaceRow,
  StatisticItem,
  StatisticsThreeColumns,
  TokenValueStat,
} from '@/common/components/statistics'
import { NumericValue } from '@/common/components/statistics/NumericValueStat'
import { shortenAddress } from '@/common/model/formatters'

import { FundingRequestDetails } from '../../types/ProposalDetails'

interface DestinationProps {
  destination: {
    account: string
    amount: number
  }
}

const FundingRequestDestination = ({ destination }: DestinationProps) => {
  return (
    <StatisticsThreeColumns>
      <TokenValueStat title="Amount" value={destination.amount} />
      <StatisticItem title="Account">
        <StatiscticSpaceRow>
          <NumericValue>{shortenAddress(destination.account, 12)}</NumericValue>
          <CopyButton textToCopy={destination.account} />
        </StatiscticSpaceRow>
      </StatisticItem>
    </StatisticsThreeColumns>
  )
}

interface FundingRequestDetailsProps {
  details: FundingRequestDetails
}

export const FundingRequestDetailsComponent = ({ details }: FundingRequestDetailsProps) => {
  return (
    <>
      {details.destinations?.map((destination) => (
        <FundingRequestDestination destination={destination} key={destination.account + destination.amount} />
      ))}
    </>
  )
}
