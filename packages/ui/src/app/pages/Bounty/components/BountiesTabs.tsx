import React from 'react'

import { usePageTabs } from '@/app/hooks/usePageTabs'
import { BountyRoutes } from '@/bounty/constants'
import { Tabs } from '@/common/components/Tabs'

export const BountiesTabs = () => {
  const tabs = usePageTabs([
    ['Current', BountyRoutes.currentBounties],
    ['Past', BountyRoutes.pastBounties],
    ['My Bounties', BountyRoutes.myBounties],
    ['My Contributions', BountyRoutes.myContributions],
    ['My Entries', BountyRoutes.myEntries],
    ['Tags', BountyRoutes.bountyTags],
  ])

  return <Tabs tabs={tabs} />
}
