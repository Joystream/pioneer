import React, { useMemo } from 'react'

import { BountyExpired } from '@/bounty/components/BountyExpired/BountyExpired'
import { Bounty } from '@/bounty/types/Bounty'

export interface BountyMainProps {
  bounty: Bounty
}

export const BountyMain = ({ bounty }: BountyMainProps) => {
  const page = useMemo(() => {
    switch (bounty.stage) {
      case 'expired':
        return <BountyExpired bounty={bounty} />
      default:
        return null
    }
  }, [bounty.stage])

  return page
}
