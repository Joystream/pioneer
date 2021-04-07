import React from 'react'
import { useHistory } from 'react-router-dom'

import { Page } from '../../../../common/components/page/Page'
import { PageContent } from '../../../../common/components/page/PageContent'
import { PageHeader } from '../../../../common/components/page/PageHeader'
import { Tabs } from '../../../../common/components/page/PageTabs'
import { PageTitle } from '../../../../common/components/page/PageTitle'
import { SideBar } from '../../../../common/components/page/SideBar'
import { Breadcrumbs } from '../../../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { useWorkingGroups } from '../../../../common/hooks/useWorkingGroups'
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
