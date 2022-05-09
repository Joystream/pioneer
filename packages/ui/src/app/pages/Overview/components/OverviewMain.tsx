import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { CouncilOverview } from '@/overview/components/CouncilOverview/CouncilOverview'
import { DeadlineList } from '@/overview/components/DeadlineList/DeadlineList'
import { EarnedAndReward } from '@/overview/components/EarnedAndReward/EarnedAndReward'
import { ForumThreadsOverview } from '@/overview/components/ForumOverview/ForumThreadsOverview'
import { ProposalsOverview } from '@/overview/components/ProposalsOverview/ProposalsOverview'
import { WorkingGroupsOverview } from '@/overview/components/WorkingGroupsOverview/WorkingGroupsOverview'

export const OverviewMain = () => {
  const { active } = useMyMemberships()
  const { t } = useTranslation('overview')

  const content = useMemo(() => {
    if (active) {
      return (
        <>
          {/*//TODO value has to be added*/}
          <EarnedAndReward earnedTitle={t('totalEarned')} rewardTitle={t('totalOwed')} />
          <SectionsWrapper>
            <DeadlineList member={active} />
          </SectionsWrapper>
        </>
      )
    } else {
      return (
        <SectionsWrapper>
          <WorkingGroupsOverview />
          <CouncilOverview />
          <ProposalsOverview />
          <ForumThreadsOverview />
        </SectionsWrapper>
      )
    }
  }, [active])

  return (
    <MainPanel>
      <PageTitle>
        {t('welcome')} {active?.handle ?? t('guest')}
      </PageTitle>
      {content}
    </MainPanel>
  )
}

const SectionsWrapper = styled.div`
  margin: 36px 18px 16px 0;
  display: grid;
  row-gap: 24px;
`
