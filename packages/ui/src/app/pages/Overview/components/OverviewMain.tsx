import React from 'react'
import { useTranslation } from 'react-i18next'

import { MainPanel } from '@/common/components/page/PageContent'
import { TextExtraHuge } from '@/common/components/typography'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { OverviewSidebar } from '@/overview/components/OverviewSidebar/OverviewSidebar'
import { CouncilOverview } from '@/overview/components/CouncilOverview/CouncilOverview'
import { ProposalsOverview } from '@/overview/components/ProposalsOverview/ProposalsOverview'
import { ForumThreadsOverview } from '@/overview/components/ForumOverview/ForumThreadsOverview'
import styled from 'styled-components'
import { PageTitle } from '@/common/components/page/PageTitle'

export const OverviewMain = () => {
  const { active } = useMyMemberships()
  const { t } = useTranslation('overview')

  return (
    <MainPanel>
      <PageTitle>
        {t('welcome')} {active?.handle ?? t('guest')}
      </PageTitle>
      <SectionsWrapper>
        <CouncilOverview />
        <ProposalsOverview />
        <ForumThreadsOverview />
      </SectionsWrapper>
    </MainPanel>
  )
}

const SectionsWrapper = styled.div`
  margin: 36px 18px 0 0;
  display: grid;
  row-gap: 24px;
`
