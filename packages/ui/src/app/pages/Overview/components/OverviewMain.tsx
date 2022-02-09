import React from 'react'
import { useTranslation } from 'react-i18next'

import { MainPanel } from '@/common/components/page/PageContent'
import { TextExtraHuge } from '@/common/components/typography'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { DeadlineList } from '@/overview/components/DeadlineList/DeadlineList'

export const OverviewMain = () => {
  const { active } = useMyMemberships()
  const { t } = useTranslation('overview')

  return (
    <MainPanel>
      <TextExtraHuge>
        {t('welcome')} {active ? active?.handle : t('guest')}
      </TextExtraHuge>
      <DeadlineList />
    </MainPanel>
  )
}
