import React from 'react'

import { Tabs } from '../../../../common/components/Tabs'
import { usePageTabs } from '../../../hooks/usePageTabs'

export const WorkingGroupsTabs = () => {
  const tabs = usePageTabs([
    ['Openings', '/working-groups/openings'],
    ['Working Groups', '/working-groups'],
    ['My Applications', '/working-groups/my-applications'],
    ['My Roles', '/working-groups/my-roles'],
  ])

  return <Tabs tabs={tabs} />
}
