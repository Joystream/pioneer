import React from 'react'

import { BountiesLayout } from '@/app/pages/Bounty/components/BountiesLayout'
import { BountiesTiles } from '@/bounty/components/BountiesTiles'
import { QueryExtraFilter } from '@/bounty/hooks/useBounties'
import { whenDefined } from '@/common/utils'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const BountiesMyContributions = () => {
  const { active, members } = useMyMemberships()

  const extraFilter: QueryExtraFilter<string[]> = {
    path: 'contributions_some.contributorId_in',
    value: whenDefined(active?.id, (id) => [id]) ?? members.map((member) => member.id),
  }

  return (
    <BountiesLayout
      tilesComponent={<BountiesTiles onlyContributed />}
      extraFilter={extraFilter}
      hasNoMember={!members.length}
    />
  )
}
