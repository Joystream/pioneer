import BN from 'bn.js'
import React from 'react'

import { Statistics, TokenValueStat } from '@/common/components/statistics'

interface PastCouncilStatsProps {
  totalSpent: BN
  totalDebt: BN
  totalRewards: BN
  totalSpentOnProposals: BN
}

export const PastCouncilStats = ({
  totalSpent,
  totalDebt,
  totalRewards,
  totalSpentOnProposals,
}: PastCouncilStatsProps) => (
  <Statistics>
    <TokenValueStat title="Total spent" value={totalSpent} />
    <TokenValueStat title="Total debt" value={totalDebt} />
    <TokenValueStat title="Total rewards" value={totalRewards} />
    <TokenValueStat title="Total spent on proposals" value={totalSpentOnProposals} />
  </Statistics>
)
