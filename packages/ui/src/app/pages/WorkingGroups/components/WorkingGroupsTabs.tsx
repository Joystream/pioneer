import React from 'react'
import { useHistory } from 'react-router-dom'

import { Tabs } from '../../../../common/components/Tabs'

export const WorkingGroupsTabs = ({ active }: { active: string }) => {
  const history = useHistory()

  const tabs = [
    { title: 'Openings', active: false, onClick: () => history.push('/working-groups') },
    { title: 'Working Groups', active: false, onClick: () => history.push('/working-groups/working-groups') },
    { title: 'My Applications', active: false, onClick: () => history.push('/working-groups/my-applications') },
    { title: 'My Roles', active: false, onClick: () => history.push('/working-groups/my-roles') },
  ].map((tab) => ({
    ...tab,
    active: tab.title === active,
  }))

  return <Tabs tabs={tabs} />
}
