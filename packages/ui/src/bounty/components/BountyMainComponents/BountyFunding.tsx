import React, { useMemo } from 'react'

import { BountyFooter } from '@/bounty/components/BountyFooter'
import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { BountyTab } from '@/bounty/components/tabs/BountyTab'
import { Bounty } from '@/bounty/types/Bounty'
import { ContentWithSidePanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'

import { getFundingPeriodLength } from '../../helpers'
import { FundingTiles } from '../BountyTiles/FundingTiles'

interface Props {
  bounty: Bounty
}

export const BountyFunding = React.memo(({ bounty }: Props) => {
  const periodsLengths = useMemo(
    () => ({
      fundingPeriodLength: getFundingPeriodLength(bounty.fundingType),
      judgingPeriodLength: bounty.judgingPeriod,
      workPeriodLength: bounty.workPeriod,
    }),
    [bounty]
  )

  return (
    <>
      <MainPanel>
        <FundingTiles bounty={bounty} />
        <ContentWithSidePanel>
          <BountyTab bounty={bounty} />
          <RowGapBlock gap={4}>
            <BountySidebar contributors={bounty.contributors} stage="funding" periodsLengths={periodsLengths} />
          </RowGapBlock>
        </ContentWithSidePanel>
      </MainPanel>
      <BountyFooter bounty={bounty} />
    </>
  )
})
