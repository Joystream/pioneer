import React from 'react'
import { Page } from '../../components/page/Page'
import { Navigation } from '../../components/page/Navigation'
import { PageContent } from '../../components/page/PageContent'
import { Accounts } from './Accounts'
import { useAccounts } from '../../hooks/useAccounts'

export function Profile() {
  const { hasAccounts, allAccounts } = useAccounts()

  if (!hasAccounts) {
    return <div>Loading...</div>
  }

  return (
    <Page>
      <Navigation />
      <PageContent>
        <Accounts accounts={allAccounts} />
      </PageContent>
    </Page>
  )
}
