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
    <TokenValueStat title="Total spent" value={totalSpent} />
    <TokenValueStat title="Total missed rewards" value={totalMissedRewards} />
    <TokenValueStat title="Total paid rewards" value={totalPaidRewards} />
    <TokenValueStat title="Total spent on proposals" value={totalSpentOnProposals} />
  </Statistics>
)
