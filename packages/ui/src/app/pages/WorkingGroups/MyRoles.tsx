import React from 'react'

import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { TextBig } from '../../../common/components/typography'
import { AppPage } from '../../components/AppPage'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

export const MyRoles = () => (
  <AppPage>
    <PageHeader>
      <PageTitle>Working Groups</PageTitle>
      <WorkingGroupsTabs />
    </PageHeader>
    <TextBig>My roles</TextBig>
  </AppPage>
)
