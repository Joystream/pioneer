import React, { useState } from 'react'
import styled from 'styled-components'

import { ExpiredTabs, ExpiredTabsState } from '@/bounty/components/BountyExpired/ExpiredTabs'
import { ExpiredTiles } from '@/bounty/components/BountyExpired/ExpiredTiles'
import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { BountyTab } from '@/bounty/components/tabs/BountyTab'
import { WorkTab } from '@/bounty/components/tabs/WorkTab'
import { BlockInfo } from '@/common/components/BlockTime/BlockInfo'
import { ContentWithSidePanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { TextSmall } from '@/common/components/typography'
import { BN_ZERO, Colors } from '@/common/constants'
import { formatDateString } from '@/common/model/formatters'
import { randomBlock } from '@/mocks/helpers/randomBlock'

const RANDOM_BLOCK = randomBlock()

export const BountyExpired = () => {
  const [active, setActive] = useState<ExpiredTabsState>('Bounty')

  return (
    <MainPanel>
      <ExpiredTiles />
      <ExpiredTabs active={active} setActive={setActive} />
      <ContentWithSidePanel>
        {active === 'Bounty' && <BountyTab />}
        {active === 'Works' && <WorkTab />}
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
      <BountyInfoWrapper>
        <TextSmall>Created: {formatDateString(RANDOM_BLOCK.timestamp, 'l')}</TextSmall>
        <Separator>{' | '}</Separator>
        <BlockInfo block={RANDOM_BLOCK} />
      </BountyInfoWrapper>
    </MainPanel>
  )
}

const BountyInfoWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  color: ${Colors.Black[400]};
`

const Separator = styled.span`
  font-size: inherit;
  line-height: inherit;
  margin: 0 5px;
`
