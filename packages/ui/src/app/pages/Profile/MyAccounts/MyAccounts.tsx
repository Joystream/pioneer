import React from 'react'

import { useTotalBalances } from '../../../../accounts/hooks/useTotalBalances'
import { Page } from '../../../../common/components/page/Page'
import { PageContent } from '../../../../common/components/page/PageContent'
import { PageHeader } from '../../../../common/components/page/PageHeader'
import { PageTitle } from '../../../../common/components/page/PageTitle'
import { SideBar } from '../../../../common/components/page/SideBar'
import { Breadcrumbs } from '../../../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { Statistics } from '../../../../common/components/statistics/Stats'
import { MyProfile, MyProfileContent } from '../Components'
import { MyProfileTabs } from '../MyProfileTabs'

import { Accounts } from './Accounts'

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
