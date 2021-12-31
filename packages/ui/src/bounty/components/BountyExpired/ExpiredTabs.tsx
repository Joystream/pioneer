import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Tabs } from '@/common/components/Tabs'

export type ExpiredTabsState = 'Bounty' | 'Works'

interface Props {
  setActive: (active: ExpiredTabsState) => void
  active: ExpiredTabsState
}

export const ExpiredTabs = ({ setActive, active }: Props) => {
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
}
