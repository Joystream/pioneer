import React from 'react'
import { useHistory } from 'react-router-dom'
import { Page } from '../../components/page/Page'
import { PageContent } from '../../components/page/PageContent'
import { PageHeader } from '../../components/page/PageHeader'
import { Tabs } from '../../components/page/PageTabs'
import { PageTitle } from '../../components/page/PageTitle'
import { SideBar } from '../../components/page/SideBar'
import { Breadcrumbs } from '../../components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { GroupsContainer } from './GroupsComponents'
import { WorkingGroupsList } from './WorkingGroupsList'

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
        <GroupsContainer>
          <PageHeader>
            <PageTitle>Working Groups</PageTitle>
            <Tabs tabs={[{ inner: 'Working Groups', active: true, onClick: () => history.push('/groups') }]} />
          </PageHeader>
          <WorkingGroupsList
            groups={[
              {
                leaderAddress: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
                groupTitle: 'Distribution',
                groupContent:
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
              },
              {
                groupImage: 'https://s.gitcoin.co/static/v2/card/thumb.0a0be2e5841a.jpg',
                leaderAddress: '5Grwasdaqqwb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
                groupTitle: 'Storage',
                groupContent:
                  "👌🏻 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              },
              {
                leaderAddress: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
                groupTitle: 'Forum',
                groupContent:
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
              },
            ]}
          />
        </GroupsContainer>
      </PageContent>
    </Page>
  )
}
