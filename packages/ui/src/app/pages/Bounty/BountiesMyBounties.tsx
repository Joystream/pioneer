import React from 'react'

import { BountiesLayout } from '@/app/pages/Bounty/components/BountiesLayout'
import { TopContributors } from '@/bounty/components/TopContributors/TopContributors'
import { QueryExtraFilter } from '@/bounty/hooks/useBounties'
import { whenDefined } from '@/common/utils'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const BountiesMyBounties = () => {
  const { active, members } = useMyMemberships()

  const extraFilter: QueryExtraFilter<string[]> = {
    path: 'creator.id_in',
    value: whenDefined(active?.id, (id) => [id]) ?? members.map((members) => members.id),
  }

  return <BountiesLayout tilesComponent={<TopContributors />} extraFilter={extraFilter} hasNoMember={!members.length} />
}
