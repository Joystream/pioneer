import React, { useState } from 'react'

import { ExpiredTabs, ExpiredTabsState } from '@/bounty/components/BountyExpired/ExpiredTabs'
import { ExpiredTiles } from '@/bounty/components/BountyExpired/ExpiredTiles'
import { BountyFooter } from '@/bounty/components/BountyFooter'
import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { BountyTab } from '@/bounty/components/tabs/BountyTab'
import { WorkTab } from '@/bounty/components/tabs/WorkTab'
import { useBountyPreviewTabViaUrlParameter } from '@/bounty/hooks/useBountyPreviewTabViaUrlParameter'
import { Bounty } from '@/bounty/types/Bounty'
import { ContentWithSidePanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { BN_ZERO } from '@/common/constants'

interface Props {
  bounty: Bounty
}

export const BountyExpired = ({ bounty }: Props) => {
  const [active, setActive] = useState<ExpiredTabsState>('Bounty')
  const [wasSearched, setWasSearched] = useState<boolean>(false)

  useBountyPreviewTabViaUrlParameter((tab) => {
    setActive(tab)
  })

  return (
    <>
      <MainPanel>
        <ExpiredTiles bounty={bounty} />
        <ExpiredTabs active={active} setActive={setActive} />
        <ContentWithSidePanel>
          {active === 'Bounty' && <BountyTab bounty={bounty} />}
          {active === 'Works' && (
            <WorkTab bountyId={bounty.id} wasSearched={wasSearched} setWasSearched={setWasSearched} />
          )}{' '}
          <RowGapBlock gap={4}>
            <BountySidebar
              contributors={bounty.contributors}
              stage="expired"
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
