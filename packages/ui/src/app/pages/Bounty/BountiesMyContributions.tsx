import React from 'react'

import { BountiesLayout } from '@/app/pages/Bounty/components/BountiesLayout'
import { BountiesTiles } from '@/bounty/components/BountiesTiles'
import { QueryExtraFilter } from '@/bounty/hooks/useBounties'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const BountiesMyContributions = () => {
  const { active } = useMyMemberships()

  const extraFilter: QueryExtraFilter<string> = {
    path: 'contributions_some.worker.id_eq',
    value: active?.id || '',
  }

  return (
    <BountiesLayout tilesComponent={<BountiesTiles onlyContributed />} extraFilter={extraFilter} noMember={!active} />
  )
}
