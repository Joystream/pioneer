import React, { useState } from 'react'

import { FailedTabs, FailedTabsState } from '@/bounty/components/BountyFailed/FailedTabs'
import { FailedTiles } from '@/bounty/components/BountyFailed/FailedTiles'
import { BountyFooter } from '@/bounty/components/BountyFooter'
import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { BountyTab } from '@/bounty/components/tabs/BountyTab'
import { WinnersTab } from '@/bounty/components/tabs/WinnersTab'
import { WorkTab } from '@/bounty/components/tabs/WorkTab'
import { Bounty } from '@/bounty/types/Bounty'
import { ContentWithSidePanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { BN_ZERO } from '@/common/constants'

interface Props {
  bounty: Bounty
}

export const BountyFailed = ({ bounty }: Props) => {
  const [active, setActive] = useState<FailedTabsState>('Bounty')

  return (
    <>
      <MainPanel>
        <FailedTiles bounty={bounty} />
        <FailedTabs setActive={setActive} active={active} />
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
                fundingPeriodLength: BN_ZERO,
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
