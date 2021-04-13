import React from 'react'

import { Tabs } from '../../../../common/components/Tabs'
import { usePageTabs } from '../../../hooks/usePageTabs'

export const MyProfileTabs = () => {
  const tabs = usePageTabs([
    ['My Accounts', '/profile'],
    ['My Memberships', '/profile/memberships'],
  ])

  return <Tabs tabs={tabs} />
}
