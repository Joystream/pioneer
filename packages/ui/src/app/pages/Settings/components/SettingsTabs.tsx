import React from 'react'

import { Tabs } from '../../../../common/components/Tabs'
import { usePageTabs } from '../../../hooks/usePageTabs'

export const SettingsTabs = () => {
  const tabs = usePageTabs([
    ['Network', '/settings'],
    // ['Language', '/settings/language'],
    ['Notifications', '/settings/notifications'],
  ])

  return <Tabs tabs={tabs} />
}
