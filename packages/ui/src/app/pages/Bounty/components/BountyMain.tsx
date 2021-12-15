import React from 'react'

import { MainPanel } from '@/common/components/page/PageContent'

export interface BountyMainProps {
  id: string
}

export const BountyMain = ({ id }: BountyMainProps) => {
  return <MainPanel>Bounty: {id}</MainPanel>
}
