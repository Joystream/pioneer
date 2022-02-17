import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Tabs } from '@/common/components/Tabs'

export type CommonTabsState = 'Bounty' | 'Works'

interface Props {
  setActive: (active: CommonTabsState) => void
  active: CommonTabsState
}

export const CommonTabs = React.memo(({ setActive, active }: Props) => {
  const { t } = useTranslation('bounty')
  const tabs = useMemo(
    () => [
      {
        title: t('tabs.bounty'),
        active: active === 'Bounty',
        onClick: () => setActive('Bounty'),
      },
      {
        title: t('tabs.works'),
        active: active === 'Works',
        onClick: () => setActive('Works'),
      },
    ],
    [active]
  )

  return <Tabs tabs={tabs} />
})
