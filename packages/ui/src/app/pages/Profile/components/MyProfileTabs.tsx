import React from 'react'
import { useHistory } from 'react-router-dom'

import { Tabs } from '../../../../common/components/Tabs'

export const MyProfileTabs = ({ active }: { active: string }) => {
  const history = useHistory()

  const tabs = [
    { title: 'My Accounts', active: false, onClick: () => history.push('/profile') },
    { title: 'My Memberships', active: false, onClick: () => history.push('/profile/memberships') },
  ].map((tab) => ({
    ...tab,
    active: tab.title === active,
  }))

  return <Tabs tabs={tabs} />
}
