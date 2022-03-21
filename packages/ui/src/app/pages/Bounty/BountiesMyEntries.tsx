import React from 'react'

import { BountiesLayout } from '@/app/pages/Bounty/components/BountiesLayout'
import { BountiesTiles } from '@/bounty/components/BountiesTiles'
import { QueryExtraFilter } from '@/bounty/hooks/useBounties'
import { whenDefined } from '@/common/utils'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const BountiesMyEntries = () => {
  const { active, members } = useMyMemberships()

  const extraFilter: QueryExtraFilter<string[]> = {
    path: 'entries_some.worker.id_in',
    value: whenDefined(active?.id, (id) => [id]) ?? members.map((member) => member.id),
  }

  return <BountiesLayout extraFilter={extraFilter} tilesComponent={<BountiesTiles />} hasNoMember={!members.length} />
}
