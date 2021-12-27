import React, { useMemo } from 'react'

import { Tabs } from '@/common/components/Tabs'

export type ExpiredTabsState = 'Bounty' | 'Works'

interface Props {
  setActive: (active: ExpiredTabsState) => void
  active: ExpiredTabsState
}

export const ExpiredTabs = ({ setActive, active }: Props) => {
  const tabs = useMemo(
    () => [
      {
        title: 'Bounty',
        active: active === 'Bounty',
        onClick: () => setActive('Bounty'),
      },
      {
        title: 'Works',
        active: active === 'Works',
        onClick: () => setActive('Works'),
      },
    ],
    [active]
  )

  return <Tabs tabs={tabs} />
}
