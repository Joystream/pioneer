import React from 'react'

import { PageLayout, PageHeaderWrapper } from '@/app/components/PageLayout'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SimpleSelect } from '@/common/components/selects'
import { NetworkType, useNetwork } from '@/common/hooks/useNetwork'

export const Settings = () => {
  const options: NetworkType[] = ['local', 'local-mocks', 'olympia-testnet']
  const [network, setNetwork] = useNetwork()

  const switchNetwork = (network: NetworkType | null) => {
    if (network) {
      setNetwork(network)
      window.location.reload()
    }
  }

  return (
    <PageLayout
      header={
        <PageHeaderWrapper>
          <PageTitle>Settings</PageTitle>
        </PageHeaderWrapper>
      }
      main={
        <MainPanel>
          <SimpleSelect
            title="Select network"
            options={options}
            value={network}
            onChange={switchNetwork}
            selectSize="l"
          />
        </MainPanel>
      }
    />
  )
}
