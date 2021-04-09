import React from 'react'
import { useHistory } from 'react-router-dom'

import { useWorkingGroups } from '../../../../working-groups/hooks/useWorkingGroups'
import { AppPage } from '../../../components/AppPage'

import { WorkingGroupsList } from './WorkingGroupsList'

export const WorkingGroups = () => {
  const history = useHistory()
  const { isLoading, groups } = useWorkingGroups()

  if (isLoading) {
    return null
  }

  const tabs = [
    { title: 'Working Groups', active: true, onClick: () => history.push('/working-groups/list') },
    { title: 'Openings', active: false, onClick: () => history.push('/working-groups/openings') },
  ]

  const crumbs = [
    { href: '#', text: 'Working Groups' },
    { href: '#', text: 'Working Groups' },
  ]

  const pageTitle = 'Working Groups'

  return (
    <AppPage crumbs={crumbs} pageTitle={pageTitle} tabs={tabs}>
      <WorkingGroupsList groups={groups} />
    </AppPage>
  )
}
