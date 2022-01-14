import React from 'react'

import { BountiesLayout } from '@/app/pages/Bounty/components/BountiesLayout'
import { QueryExtraFilter } from '@/bounty/hooks/useBounties'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const BountiesMyBounties = () => {
  const { active } = useMyMemberships()

  const extraFilter: QueryExtraFilter<string> = {
    path: 'creator.id_eq',
    value: active?.id || '',
  }

  return <BountiesLayout extraFilter={extraFilter} />
}
