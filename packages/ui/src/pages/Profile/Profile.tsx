import React from 'react'
import { Page } from '../../components/page/Page'
import { SideBar } from '../../components/page/SideBar'
import { PageContent } from '../../components/page/PageContent'
import { Accounts } from './Accounts'
import { useAccounts } from '../../hooks/useAccounts'
import styled from 'styled-components'

export function Profile() {
  const { hasAccounts, allAccounts } = useAccounts()

  if (!hasAccounts) {
    return <Loading>Loading...</Loading>
  }

  return (
    <Page>
      <SideBar />
      <PageContent>
        <Accounts accounts={allAccounts} />
      </PageContent>
    </Page>
  )
}

const Loading = styled.div`
  font-size: 2em;
`
