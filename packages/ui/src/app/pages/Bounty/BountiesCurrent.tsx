import React from 'react'

import { BountiesLayout } from '@/app/pages/Bounty/components/BountiesLayout'
import { BountiesMain } from '@/app/pages/Bounty/components/BountiesMain'
import { BountiesList } from '@/bounty/components/BountiesList'

export const BountiesCurrent = () => {
  return (
    <BountiesLayout>
      <BountiesMain />
      <BountiesList />
    </BountiesLayout>
  )
}
