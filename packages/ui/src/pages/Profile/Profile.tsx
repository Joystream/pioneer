import React from 'react'
import { Page } from '../../components/page/Page'
import { PageContent } from '../../components/page/PageContent'
import { SideBar } from '../../components/page/SideBar'
import { Accounts } from './Accounts'

export function Profile() {
  return (
    <Page>
      <SideBar />
      <PageContent>
        <Accounts />
      </PageContent>
    </Page>
  )
}
