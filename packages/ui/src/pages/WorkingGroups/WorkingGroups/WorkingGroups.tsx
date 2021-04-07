import React from 'react'
import { useHistory } from 'react-router-dom'

import { Page } from '../../../components/page/Page'
import { PageContent } from '../../../components/page/PageContent'
import { PageHeader } from '../../../components/page/PageHeader'
import { Tabs } from '../../../components/page/PageTabs'
import { PageTitle } from '../../../components/page/PageTitle'
import { SideBar } from '../../../components/page/SideBar'
import { Breadcrumbs } from '../../../components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { useWorkingGroups } from '../../../hooks/useWorkingGroups'
import { GroupsContainer } from '../Components'
import { WorkingGroupsList } from './WorkingGroupsList'

export const WorkingGroups = () => {
  const history = useHistory()
  const { isLoading, groups } = useWorkingGroups()

  if (isLoading) {
    return null
  }

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
            <Tabs tabs={[{ inner: 'Working Groups', active: true, onClick: () => history.push('/groups') }]} />
          </PageHeader>
          <WorkingGroupsList groups={groups} />
        </GroupsContainer>
      </PageContent>
    </Page>
  )
}
