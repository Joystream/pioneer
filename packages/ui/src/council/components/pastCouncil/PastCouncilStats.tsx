import BN from 'bn.js'
import React from 'react'

import { LinkSymbol } from '@/common/components/icons/symbols'
import { Statistics, TokenValueStat } from '@/common/components/statistics'
import { TooltipExternalLink } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'

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
      tooltipText="Total rewards missed. Missed rewards happen due to .. "
    />
    <TokenValueStat
      title="Total paid rewards"
      value={totalPaidRewards}
      tooltipText="Council Rewards paid to council members."
    />
    <TokenValueStat
      title="Total spent on proposals"
      value={totalSpentOnProposals}
      tooltipText={
        <>
          Total council budget spent on proposals, including funding proposals. More details on proposals spending can
          be found in the Overview module{' '}
          <TooltipExternalLink
            href="https://joystream.gitbook.io/joystream-handbook/governance/council#council"
            target="_blank"
          >
            <TextMedium>Link</TextMedium> <LinkSymbol />
          </TooltipExternalLink>
        </>
      }
    />
  </Statistics>
)
