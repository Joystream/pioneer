import React, { useMemo, useState } from 'react'

import { BountyFooter } from '@/bounty/components/BountyFooter'
import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { CommonTiles } from '@/bounty/components/BountyTiles/CommonTiles'
import { BountyTab } from '@/bounty/components/tabs/BountyTab'
import { WorkTab } from '@/bounty/components/tabs/WorkTab'
import { CommonTabs, CommonTabsState } from '@/bounty/components/tabsSets/CommonTabs'
import { getFundingPeriodLength } from '@/bounty/helpers'
import { useBountyEntrants } from '@/bounty/hooks/useBountyEntrants'
import { useBountyPreviewTabViaUrlParameter } from '@/bounty/hooks/useBountyPreviewTabViaUrlParameter'
import { useBountyWithdrawns } from '@/bounty/hooks/useBountyWithdrawns'
import { Bounty } from '@/bounty/types/Bounty'
import { ContentWithSidePanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'

interface Props {
  bounty: Bounty
}

export const BountyExpired = React.memo(({ bounty }: Props) => {
  const [active, setActive] = useState<CommonTabsState>('Bounty')
  const entrants = useBountyEntrants(bounty)
  const withdrawns = useBountyWithdrawns(bounty)
  const periodsLengths = useMemo(
    () => ({
      fundingPeriodLength: getFundingPeriodLength(bounty.fundingType),
      judgingPeriodLength: bounty.judgingPeriod,
      workPeriodLength: bounty.workPeriod,
    }),
    [bounty]
  )
  const [wasSearched, setWasSearched] = useState<boolean>(false)

  useBountyPreviewTabViaUrlParameter((tab) => {
    setActive(tab)
  })

  return (
    <>
      <MainPanel>
        <CommonTiles bounty={bounty} period="expired" />
        <CommonTabs active={active} setActive={setActive} />
        <ContentWithSidePanel>
          {active === 'Bounty' && <BountyTab bounty={bounty} />}
          {active === 'Works' && (
            <WorkTab bountyId={bounty.id} wasSearched={wasSearched} setWasSearched={setWasSearched} />
          )}{' '}
          <RowGapBlock gap={4}>
            <BountySidebar
              entrants={entrants}
              contributors={bounty.contributors}
              withdrawals={withdrawns}
              stage="expired"
              periodsLengths={periodsLengths}
            />
          </RowGapBlock>
        </ContentWithSidePanel>
      </MainPanel>
      <BountyFooter bounty={bounty} />
    </>
  )
})
