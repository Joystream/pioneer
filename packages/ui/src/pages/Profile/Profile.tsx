import { Page } from '../../components/page/Page'
import { Navigation } from '../../components/page/Navigation'
import React from 'react'
import { PageContent } from '../../components/page/PageContent'

export function Profile() {
  return (
    <Page>
      <Navigation />
      <PageContent>Dashboard</PageContent>
    </Page>
  )
}
