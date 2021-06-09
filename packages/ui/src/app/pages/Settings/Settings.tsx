import React from 'react'

import { InputComponent } from '@/common/components/forms'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SimpleSelect } from '@/common/components/selects'

import { AppPage } from '../../components/AppPage'

export const Settings = () => {
  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Settings</PageTitle>
      </PageHeader>
      <MainPanel>
        <InputComponent label="Network">
          <SimpleSelect values={['local', 'olympia-testnet']} value={'local'} onChange={() => undefined} />
        </InputComponent>
      </MainPanel>
    </AppPage>
  )
}
