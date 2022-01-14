import React from 'react'

import { BountiesLayout } from '@/app/pages/Bounty/components/BountiesLayout'
import { BountiesTiles } from '@/bounty/components/BountiesTiles'
import { QueryExtraFilter } from '@/bounty/hooks/useBounties'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const BountiesMyEntries = () => {
  const { active } = useMyMemberships()

  const extraFilter: QueryExtraFilter<string> = {
    path: 'entries_some.worker.id_eq',
    value: active?.id || '',
  }

  return <BountiesLayout extraFilter={extraFilter} tilesComponent={<BountiesTiles />} />
}
