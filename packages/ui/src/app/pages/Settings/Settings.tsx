import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { NetworkType } from '@/app/config'
import { ButtonPrimary } from '@/common/components/buttons'
import { LanguageSelect } from '@/common/components/LanguageSelect'
import NetworkInfo from '@/common/components/NetworkInfo/NetworkInfo'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PolkadotAppInfo } from '@/common/components/PolkadotAppInfo'
import { SimpleSelect } from '@/common/components/selects'
import { Tabs } from '@/common/components/Tabs'
import { useNetwork } from '@/common/hooks/useNetwork'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { useToggle } from '@/common/hooks/useToggle'
import { error } from '@/common/logger'

type Tab = 'SETTINGS' | 'LANGUAGE'

export const Settings = () => {
  const [isUpdatingMetadata, toggleMetadataUpdate] = useToggle(false)
  const { network, setNetwork, networks } = useNetwork()
  const { api } = useApi()
  const { wallet } = useMyAccounts()
  const { t } = useTranslation('settings')
  const [endpoints] = useNetworkEndpoints()
  const [currentTab, setCurrentTab] = useState<Tab>('SETTINGS')
  const tabs = [
    { title: t('network'), active: currentTab === 'SETTINGS', onClick: () => setCurrentTab('SETTINGS') },
    { title: t('language'), active: currentTab === 'LANGUAGE', onClick: () => setCurrentTab('LANGUAGE') },
  ]
  const switchNetwork = (network: NetworkType | null) => {
    if (network) {
      setNetwork(network)
      window.location.reload()
    }
  }

  const updateMD = useCallback(() => {
    if (api && wallet) {
      toggleMetadataUpdate()
      wallet
        .updateMetadata(api.chainInfo)
        .catch(error)
        .finally(() => toggleMetadataUpdate())
    }
  }, [!wallet, !api])

  return (
    <Container>
      <PageLayout
        header={
          <PageHeaderWrapper>
            <PageTitle>{t('settings')}</PageTitle>
          </PageHeaderWrapper>
        }
        main={
          <MainPanel>
            <RowGapBlock gap={32}>
              <Tabs tabsSize="xs" tabs={tabs} />
              {currentTab === 'LANGUAGE' && <LanguageSelect />}
              {currentTab === 'SETTINGS' && (
                <>
                  <SimpleSelect
                    title={t('selectNetwork')}
                    options={networks}
                    value={network}
                    onChange={switchNetwork}
                    selectSize="l"
                  />
                  <NetworkInfo
                    detailsTitle={t('networkDetails')}
                    networkAddress={endpoints.nodeRpcEndpoint}
                    queryNodeAddress={endpoints.queryNodeEndpoint}
                    faucetAddress={endpoints.membershipFaucetEndpoint}
                  />
                  <PolkadotAppInfo rpcUrl={endpoints.nodeRpcEndpoint} />
                </>
              )}
              <ButtonPrimary size="medium" disabled={isUpdatingMetadata} onClick={updateMD}>
                Update extension metadata
              </ButtonPrimary>
            </RowGapBlock>
          </MainPanel>
        }
      />
    </Container>
  )
}

export const Container = styled.div`
  width: 60%;
`
