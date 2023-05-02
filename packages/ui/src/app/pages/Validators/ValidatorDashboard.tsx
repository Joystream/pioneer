import React from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { ValidatorsTabs } from './components/ValidatorsTabs'
import { MainPanel } from '@/common/components/page/PageContent'

export const ValidatorDashboard = () => {
  return (
    <PageLayout
      header={
        <PageHeader
          title="Validators"
          tabs={<ValidatorsTabs />}
        />
      }
      main={
        <MainPanel>
          
        </MainPanel>
      }
    />
  )
}
