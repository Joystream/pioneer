import React, { useMemo } from 'react'

import { BountyExpired } from '@/bounty/components/BountyExpired/BountyExpired'

export interface BountyMainProps {
  bountyStage: 'Expired'
}

export const BountyMain = ({ bountyStage }: BountyMainProps) => {
  const page = useMemo(() => {
    switch (bountyStage) {
      case 'Expired':
        return <BountyExpired />
    }
  }, [bountyStage])

  return page
}
