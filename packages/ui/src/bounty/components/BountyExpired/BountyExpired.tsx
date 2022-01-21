import React, { useState } from 'react'

import { ExpiredTabs, ExpiredTabsState } from '@/bounty/components/BountyExpired/ExpiredTabs'
import { ExpiredTiles } from '@/bounty/components/BountyTiles/ExpiredTiles'
import { BountyFooter } from '@/bounty/components/BountyFooter'
import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { BountyTab } from '@/bounty/components/tabs/BountyTab'
import { WorkTab } from '@/bounty/components/tabs/WorkTab'
import { Bounty } from '@/bounty/types/Bounty'
import { ContentWithSidePanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { getFundingPeriodLength } from '@/bounty/helpers'

interface Props {
  bounty: Bounty
}

export const BountyExpired = ({ bounty }: Props) => {
  const [active, setActive] = useState<ExpiredTabsState>('Bounty')

  return (
    <>
      <MainPanel>
        <ExpiredTiles bounty={bounty} />
        <ExpiredTabs active={active} setActive={setActive} />
        <ContentWithSidePanel>
          {active === 'Bounty' && <BountyTab bounty={bounty} />}
          {active === 'Works' && <WorkTab bountyId={bounty.id} />}
          <RowGapBlock gap={4}>
            <BountySidebar
              contributors={bounty.contributors}
              stage="expired"
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
