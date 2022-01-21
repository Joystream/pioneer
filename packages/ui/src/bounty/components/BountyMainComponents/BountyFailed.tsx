import React, { useMemo, useState } from 'react'

import { BountyFooter } from '@/bounty/components/BountyFooter'
import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { ResultsTiles } from '@/bounty/components/BountyTiles/ResultsTiles'
import { BountyTab } from '@/bounty/components/tabs/BountyTab'
import { WinnersTab } from '@/bounty/components/tabs/WinnersTab'
import { WorkTab } from '@/bounty/components/tabs/WorkTab'
import { ResultsTabs, ResultsTabsState } from '@/bounty/components/tabsSets/ResultsTabs'
import { getFundingPeriodLength, statusToEntrantResult } from '@/bounty/helpers'
import { useBountyEntrants } from '@/bounty/hooks/useBountyEntrants'
import { useBountyWithdrawns } from '@/bounty/hooks/useBountyWithdrawns'
import { Bounty } from '@/bounty/types/Bounty'
import { ContentWithSidePanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface Props {
  bounty: Bounty
}

export const BountyFailed = ({ bounty }: Props) => {
  const [active, setActive] = useState<ResultsTabsState>('Bounty')
  const entrants = useBountyEntrants(bounty)
  const withdrawns = useBountyWithdrawns(bounty)
  const { active: activeMember } = useMyMemberships()
  const { status } =
    useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [bounty]) || {}
  const entrantResult = status ? statusToEntrantResult(status) : undefined

  return (
    <>
      <MainPanel>
        <ResultsTiles bounty={bounty} />
        <ResultsTabs setActive={setActive} active={active} />
        <ContentWithSidePanel>
          {active === 'Bounty' && <BountyTab bounty={bounty} />}
          {active === 'Works' && <WorkTab bountyId={bounty.id} />}
          {active === 'Winners' && <WinnersTab bounty={bounty} />}
          <RowGapBlock gap={4}>
            <BountySidebar
              contributors={bounty.contributors}
              entrants={entrants}
              withdrawals={withdrawns}
              entrantResult={entrantResult}
              stage="withdrawal"
              periodsLengths={{
                fundingPeriodLength: getFundingPeriodLength(bounty.fundingType),
                judgingPeriodLength: bounty.judgingPeriod,
                workPeriodLength: bounty.workPeriod,
              }}
              hidePeriods
            />
          </RowGapBlock>
        </ContentWithSidePanel>
      </MainPanel>
      <BountyFooter bounty={bounty} />
    </>
  )
}
