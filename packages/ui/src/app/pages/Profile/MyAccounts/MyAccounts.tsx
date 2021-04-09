import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { useTotalBalances } from '../../../../accounts/hooks/useTotalBalances'
import { Page } from '../../../../common/components/page/Page'
import { PageContent } from '../../../../common/components/page/PageContent'
import { PageHeader } from '../../../../common/components/page/PageHeader'
import { PageTabs } from '../../../../common/components/page/PageTabs'
import { PageTitle } from '../../../../common/components/page/PageTitle'
import { Breadcrumbs } from '../../../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { Statistics } from '../../../../common/components/statistics/Stats'
import { SideBar } from '../../../components/SideBar'
import { MyProfile, MyProfileContent } from '../Components'

import { Accounts } from './Accounts'

export function MyAccounts() {
  const { total, transferable, locked, recoverable } = useTotalBalances()
  const history = useHistory()
  const isProfile = !!useRouteMatch({
    exact: true,
    path: '/profile',
  })
  const isMembers = !!useRouteMatch('/profile/memberships')

  const tabs = [
    { title: 'My accounts', active: isProfile, onClick: () => history.push('/profile') },
    { title: 'My memberships', active: isMembers, onClick: () => history.push('/profile/memberships') },
  ]

  return (
    <Page>
      <SideBar />
      <PageContent>
        <Breadcrumbs
          crumbs={[
            { href: '#', text: 'My Profile' },
            { href: '#', text: 'My Accounts' },
          ]}
        />
        <MyProfile>
          <PageHeader>
            <PageTitle>My profile</PageTitle>
            <PageTabs tabs={tabs} />
            <Statistics
              stats={[
                { title: 'Total balance', helperText: 'Lorem fishy', value: total },
                { title: 'Total transferable balance', helperText: 'Lorem fishy', value: transferable },
                { title: 'Total locked balance', helperText: 'Lorem fishy', value: locked },
                { title: 'Total recoverable', helperText: 'Lorem fishy', value: recoverable },
              ]}
            />
          </PageHeader>
          <MyProfileContent>
            <Accounts />
          </MyProfileContent>
        </MyProfile>
      </PageContent>
    </Page>
  )
}
