import React from 'react'
import { useHistory } from 'react-router-dom'

import { Page } from '../../../../common/components/page/Page'
import { PageContent } from '../../../../common/components/page/PageContent'
import { PageHeader } from '../../../../common/components/page/PageHeader'
import { PageTabs } from '../../../../common/components/page/PageTabs'
import { PageTitle } from '../../../../common/components/page/PageTitle'
import { Breadcrumbs } from '../../../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { useWorkingGroups } from '../../../../working-groups/hooks/useWorkingGroups'
import { SideBar } from '../../../components/SideBar'
import { GroupsContainer } from '../Components'

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

  return (
    <Page>
      <SideBar />
      <PageContent>
        <Breadcrumbs
          crumbs={[
            { href: '#', text: 'Working Groups' },
            { href: '#', text: 'Working Groups' },
          ]}
        />
        <GroupsContainer>
          <PageHeader>
            <PageTitle>Working Groups</PageTitle>
            <PageTabs tabs={tabs} />
          </PageHeader>
          <WorkingGroupsList groups={groups} />
        </GroupsContainer>
      </PageContent>
    </Page>
  )
}
