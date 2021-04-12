import React from 'react'

import { Tabs } from '../../../../common/components/Tabs'
import { usePageTabs } from '../../../hooks/usePageTabs'

export const MyProfileTabs = () => {
  const tabs = usePageTabs([
    ['My Accounts', '/profile'],
    ['My Accounts', '/profile/memberships'],
  ])

  return <Tabs tabs={tabs} />
}
