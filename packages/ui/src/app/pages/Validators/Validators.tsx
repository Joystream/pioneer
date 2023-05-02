import React from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { ValidatorsTabs } from './components/ValidatorsTabs'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'

export const Validators = () => {
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
