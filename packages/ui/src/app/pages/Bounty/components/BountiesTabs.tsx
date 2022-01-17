import React from 'react'

import { usePageTabs } from '@/app/hooks/usePageTabs'
import { BountyRoutes } from '@/bounty/constants'
import { useUserBountyTabsInformations } from '@/bounty/hooks/useUserBountyTabsInformations'
import { Tabs } from '@/common/components/Tabs'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const BountiesTabs = () => {
  const { active } = useMyMemberships()
  const { bountiesCount, contributionsCount, entriesCount } = useUserBountyTabsInformations(active?.id || '')
  const tabs = usePageTabs([
    ['Current', BountyRoutes.currentBounties],
    ['Past', BountyRoutes.pastBounties],
    [
      'My Bounties',
      BountyRoutes.myBounties,
      {
        count: bountiesCount,
      },
    ],
    [
      'My Contributions',
      BountyRoutes.myContributions,
      {
        count: contributionsCount,
      },
    ],
    [
      'My Entries',
      BountyRoutes.myEntries,
      {
        count: entriesCount,
      },
    ],
    ['Tags', BountyRoutes.bountyTags],
  ])

  return <Tabs tabs={tabs} />
}
