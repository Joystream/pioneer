import React from 'react'

import { OverviewPageLayout } from '@/app/components/OverviewPageLayout'
import { OverviewMain } from '@/app/pages/Overview/components/OverviewMain'
import { OverviewSidebar } from '@/overview/components/OverviewSidebar/OverviewSidebar'

export const Overview = () => {
  return <OverviewPageLayout main={<OverviewMain />} sidebar={<OverviewSidebar />} />
}
