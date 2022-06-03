import React from 'react'

import { usePageTabs } from '@/app/hooks/usePageTabs'
import { BountyRoutes } from '@/bounty/constants'
import { useUserBountyTabsInformation } from '@/bounty/hooks/useUserBountyTabsInformation'
import { Tabs } from '@/common/components/Tabs'
import { whenDefined } from '@/common/utils'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const BountiesTabs = () => {
  const { active, members } = useMyMemberships()
  const memberIds = whenDefined(active?.id, (id) => [id]) ?? members.map((member) => member.id)
  const { bountiesCount, contributionsCount, entriesCount } = useUserBountyTabsInformation(memberIds)
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
    // ['Tags', BountyRoutes.bountyTags],
  ])

  return <Tabs tabs={tabs} />
}
