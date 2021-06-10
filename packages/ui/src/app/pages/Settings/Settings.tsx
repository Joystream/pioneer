import React from 'react'

import { InputComponent } from '@/common/components/forms'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SimpleSelect } from '@/common/components/selects'
import { NetworkType, useNetwork } from '@/common/hooks/useNetwork'

import { AppPage } from '../../components/AppPage'

export const Settings = () => {
  const options: NetworkType[] = ['local', 'olympia-testnet']
  const [network, setNetwork] = useNetwork()

  const switchNetwork = () => {
    if (network === 'local') {
      setNetwork('olympia-testnet')
    } else {
      setNetwork('local')
    }

    window.location.reload()
  }

  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Settings</PageTitle>
      </PageHeader>
      <MainPanel>
        <InputComponent label="Select network" borderless>
          <SimpleSelect values={options} value={network} onChange={switchNetwork} />
        </InputComponent>
      </MainPanel>
    </AppPage>
  )
}
