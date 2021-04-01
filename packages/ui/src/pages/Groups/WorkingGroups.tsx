import React from 'react'
import { useHistory } from 'react-router-dom'
import { Page } from '../../components/page/Page'
import { PageContent } from '../../components/page/PageContent'
import { PageHeader } from '../../components/page/PageHeader'
import { PageTab, PageTabs, PageTabsNav } from '../../components/page/PageTabs'
import { PageTitle } from '../../components/page/PageTitle'
import { SideBar } from '../../components/page/SideBar'
import { Breadcrumbs } from '../../components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { Groups, WorkingGroupsList } from './Groups'
import { WorkingGroup } from './WorkingGroup'

export function WorkingGroups() {
  const history = useHistory()
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
        <Groups>
          <PageHeader>
            <PageTitle>Working Groups</PageTitle>
            <PageTabs>
              <PageTabsNav>
                <PageTab active onClick={() => history.push('/grups')}>
                  Working Groups
                </PageTab>
              </PageTabsNav>
            </PageTabs>
          </PageHeader>
          <WorkingGroupsList>
            <WorkingGroup
              leaderAddress="5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY"
              groupTitle="Distribution"
              groupContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            />
            <WorkingGroup
              groupImage="https://s.gitcoin.co/static/v2/card/thumb.0a0be2e5841a.jpg"
              groupTitle="Storage"
              groupContent="👌🏻 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            />
            <WorkingGroup
              leaderAddress="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
              groupTitle="Forum"
              groupContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            />
          </WorkingGroupsList>
        </Groups>
      </PageContent>
    </Page>
  )
}
