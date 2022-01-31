import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { OverviewMain } from '@/app/pages/Overview/components/OverviewMain'

export const Overview = () => {
  return <PageLayout main={<OverviewMain />} />
}
