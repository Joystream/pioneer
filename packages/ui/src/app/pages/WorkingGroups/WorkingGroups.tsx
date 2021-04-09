import React from 'react'
import { useHistory } from 'react-router-dom'

import { WorkingGroupsList } from '../../../working-groups/components/WorkingGroupsList'
import { useWorkingGroups } from '../../../working-groups/hooks/useWorkingGroups'
import { AppPage } from '../../components/AppPage'

export const WorkingGroups = () => {
  const history = useHistory()
  const { isLoading, groups } = useWorkingGroups()

  if (isLoading) {
    return null
  }

  const tabs = [
    { title: 'Openings', active: false, onClick: () => history.push('/working-groups') },
    { title: 'Working Groups', active: true, onClick: () => history.push('/working-groups/working-groups') },
  ]

  const crumbs = [
    { href: '#', text: 'Working Groups' },
    { href: '#', text: 'Working Groups' },
  ]

  return (
    <AppPage pageTitle="Working Groups" crumbs={crumbs} tabs={tabs}>
      <WorkingGroupsList groups={groups} />
    </AppPage>
  )
}
