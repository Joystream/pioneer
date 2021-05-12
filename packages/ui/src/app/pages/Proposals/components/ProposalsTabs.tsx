import React from 'react'

import { usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { ProposalsRoutes } from '@/proposals/constants/routes'

export const ProposalsTabs = () => {
  const tabs = usePageTabs([
    ['Current', ProposalsRoutes.current],
    ['Past', ProposalsRoutes.past],
  ])

  return <Tabs tabs={tabs} />
}
