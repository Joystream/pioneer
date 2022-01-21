import React, { useState } from 'react'

import { ResultsTabs, ResultsTabsState } from '@/bounty/components/tabsSets/ResultsTabs'
import { ResultsTiles } from '@/bounty/components/BountyTiles/ResultsTiles'
import { BountyFooter } from '@/bounty/components/BountyFooter'
import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { BountyTab } from '@/bounty/components/tabs/BountyTab'
import { WinnersTab } from '@/bounty/components/tabs/WinnersTab'
import { WorkTab } from '@/bounty/components/tabs/WorkTab'
import { Bounty } from '@/bounty/types/Bounty'
import { ContentWithSidePanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { getFundingPeriodLength } from '@/bounty/helpers'

interface Props {
  bounty: Bounty
}

export const BountyFailed = ({ bounty }: Props) => {
  const [active, setActive] = useState<ResultsTabsState>('Bounty')

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
              hidePeriods
              stage="withdrawal"
              periodsLengths={{
                fundingPeriodLength: getFundingPeriodLength(bounty.fundingType),
                judgingPeriodLength: bounty.judgingPeriod,
                workPeriodLength: bounty.workPeriod,
              }}
            />
          </RowGapBlock>
        </ContentWithSidePanel>
      </MainPanel>
      <BountyFooter bounty={bounty} />
    </>
  )
}
