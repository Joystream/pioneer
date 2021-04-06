import React from 'react'

import { Page } from '../../components/page/Page'
import { PageContent } from '../../components/page/PageContent'
import { PageHeader } from '../../components/page/PageHeader'
import { PageTitle } from '../../components/page/PageTitle'
import { SideBar } from '../../components/page/SideBar'
import { Breadcrumbs } from '../../components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { Statistics } from '../../components/statistics/Stats'
import { useTotalBalances } from '../../hooks/useTotalBalances'
import { Accounts } from './MyAccounts/Accounts'
import { MyProfileTabs } from './MyProfileTabs'
import { MyProfile, MyProfileContent } from './Profile'

export function MyAccounts() {
  const { total, transferable, locked, recoverable } = useTotalBalances()

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
            <MyProfileTabs />
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
