import React from 'react'

import { InputComponent } from '@/common/components/forms'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SimpleSelect } from '@/common/components/selects'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { NetworkType } from '@/common/providers/api/provider'

import { AppPage } from '../../components/AppPage'

export const Settings = () => {
  const options: NetworkType[] = ['local', 'olympia-testnet']
  const [network, setNetwork] = useLocalStorage<NetworkType>('network')

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
        <InputComponent label="Network" borderless>
          <SimpleSelect values={options} value={network || 'local'} onChange={switchNetwork} />
        </InputComponent>
      </MainPanel>
    </AppPage>
  )
}
