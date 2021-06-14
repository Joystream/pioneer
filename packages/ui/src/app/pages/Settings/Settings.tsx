import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { InputComponent } from '@/common/components/forms'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SimpleSelect } from '@/common/components/selects'
import { NetworkType, useNetwork } from '@/common/hooks/useNetwork'

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
    <PageLayout
      header={
        <PageHeader>
          <PageTitle>Settings</PageTitle>
        </PageHeader>
      }
      main={
        <MainPanel>
          <InputComponent label="Select network" borderless>
            <SimpleSelect options={options} value={network} onChange={switchNetwork} />
          </InputComponent>
        </MainPanel>
      }
    />
  )
}
