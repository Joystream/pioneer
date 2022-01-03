import React, { useEffect } from 'react'

import { BountiesLayout } from '@/app/pages/Bounty/components/BountiesLayout'
import { BountiesMain } from '@/app/pages/Bounty/components/BountiesMain'
import { useBounty } from '@/bounty/hooks/useBounty';

export const BountiesCurrent = () => {
  const { bounty } = useBounty('1');

  useEffect(() => {
    console.log(bounty);
  }, [bounty])

  return (
    <BountiesLayout>
      <BountiesMain />
    </BountiesLayout>
  )
}
