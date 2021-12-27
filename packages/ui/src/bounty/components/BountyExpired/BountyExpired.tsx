import React, { useState } from 'react'

import { ExpiredTabs, ExpiredTabsState } from '@/bounty/components/BountyExpired/ExpiredTabs'
import { ExpiredTiles } from '@/bounty/components/BountyExpired/ExpiredTiles'
import { BountyPanel } from '@/bounty/components/BountyPanel'
import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { ContentWithSidePanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { BN_ZERO } from '@/common/constants'

export const BountyExpired = () => {
  const [active, setActive] = useState<ExpiredTabsState>('Bounty')

  return (
    <MainPanel>
      <ExpiredTiles />
      <ExpiredTabs active={active} setActive={setActive} />
      <ContentWithSidePanel>
        {active === 'Bounty' && <BountyPanel />}
        {active === 'Works' && <div>Works taB</div>}
        <RowGapBlock gap={4}>
          <BountySidebar
            contributors={[]}
            stage="expired"
            periodsLengths={{
              fundingPeriodLength: BN_ZERO,
              judgingPeriodLength: BN_ZERO,
              workPeriodLength: BN_ZERO,
            }}
          />
        </RowGapBlock>
      </ContentWithSidePanel>
    </MainPanel>
  )
}
