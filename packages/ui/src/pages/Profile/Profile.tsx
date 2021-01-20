import React from 'react'
import { Page } from '../../components/page/Page'
import { Navigation } from '../../components/page/Navigation'
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
      <Navigation />
      <PageContent>
        <Accounts accounts={allAccounts} />
      </PageContent>
      {/* eslint-disable-next-line no-undef */}
      <Version>Version: {GIT_VERSION}</Version>
    </Page>
  )
}

const Loading = styled.div`
  font-size: 2em;
`

const Version = styled.div`
  font-size: 0.8em;
  color: #555;
`
