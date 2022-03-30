import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Tabs } from '@/common/components/Tabs'

export type ResultsTabsState = 'Bounty' | 'Winners' | 'Slashed' | 'Works'

interface Props {
  setActive: (active: ResultsTabsState) => void
  active: ResultsTabsState
}

export const ResultsTabs = React.memo(({ setActive, active }: Props) => {
  const { t } = useTranslation('bounty')
  const tabs = useMemo(
    () => [
      {
        title: t('tabs.bounty'),
        active: active === 'Bounty',
        onClick: () => setActive('Bounty'),
      },
      {
        title: t('tabs.winners'),
        active: active === 'Winners',
        onClick: () => setActive('Winners'),
      },
      {
        title: t('tabs.slashed'),
        active: active === 'Slashed',
        onClick: () => setActive('Slashed'),
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
