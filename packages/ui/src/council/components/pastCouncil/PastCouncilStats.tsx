import BN from 'bn.js'
import React from 'react'

import { Statistics, TokenValueStat } from '@/common/components/statistics'

interface PastCouncilStatsProps {
  totalSpent: BN
  totalMissedRewards: BN
  totalPaidRewards: BN
  totalSpentOnProposals: BN
}

export const PastCouncilStats = ({
  totalSpent,
  totalMissedRewards,
  totalPaidRewards,
  totalSpentOnProposals,
}: PastCouncilStatsProps) => (
  <Statistics>
    <TokenValueStat
      title="Total spent"
      value={totalSpent}
      tooltipText="Total budget spent in this council on working groups, spending proposals and council rewards."
    />
    <TokenValueStat
      title="Total missed rewards"
      value={totalMissedRewards}
      tooltipText="Total rewards missed. Missed rewards are unallocated rewards from the council budget."
      tooltipLinkURL="https://joystream.gitbook.io/testnet-workspace/system/council#budget"
    />
    <TokenValueStat
      title="Total paid rewards"
      value={totalPaidRewards}
      tooltipText="Council Rewards paid to council members."
    />
    <TokenValueStat
      title="Total spent on proposals"
      value={totalSpentOnProposals}
      tooltipText="Total council budget spent on proposals, including funding proposals. More details on proposals spending can be found in the Overview module."
      tooltipLinkURL="https://joystream.gitbook.io/joystream-handbook/governance/council#council"
    />
  </Statistics>
)
