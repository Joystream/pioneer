import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { ExpiredTabs, ExpiredTabsState } from '@/bounty/components/BountyExpired/ExpiredTabs'
import { ExpiredTiles } from '@/bounty/components/BountyExpired/ExpiredTiles'
import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { BountyTab } from '@/bounty/components/tabs/BountyTab'
import { WorkTab } from '@/bounty/components/tabs/WorkTab'
import { Bounty } from '@/bounty/types/Bounty'
import { BlockInfo } from '@/common/components/BlockTime/BlockInfo'
import { ContentWithSidePanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { TextSmall } from '@/common/components/typography'
import { BN_ZERO, Colors } from '@/common/constants'
import { formatDateString } from '@/common/model/formatters'

interface Props {
  bounty: Bounty
}

export const BountyExpired = ({ bounty }: Props) => {
  const { t } = useTranslation('common')
  const [active, setActive] = useState<ExpiredTabsState>('Bounty')

  return (
    <MainPanel>
      <ExpiredTiles bounty={bounty} />
      <ExpiredTabs active={active} setActive={setActive} />
      <ContentWithSidePanel>
        {active === 'Bounty' && <BountyTab bounty={bounty} />}
        {active === 'Works' && <WorkTab bountyId={bounty.id} />}
        <RowGapBlock gap={4}>
          <BountySidebar
            entrants={
              bounty?.entries?.map((entry) => ({
                actor: entry.worker,
                count: entry.worksIds.length,
              })) ?? []
            }
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
      <BountyInfoWrapper>
        <TextSmall>
          {t('created')}: {formatDateString(bounty.createdAt, 'l')}
        </TextSmall>
        <Separator>{' | '}</Separator>
        <BlockInfo
          block={{
            number: bounty.inBlock,
            network: 'OLYMPIA',
            timestamp: bounty.createdAt,
          }}
        />
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
