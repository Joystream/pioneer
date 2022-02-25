import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { NetworkType } from '@/app/config'
import { LanguageSelect } from '@/common/components/LanguageSelect'
import NetworkInfo from '@/common/components/NetworkInfo/NetworkInfo'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SimpleSelect } from '@/common/components/selects'
import { Tabs } from '@/common/components/Tabs'
import { useNetwork } from '@/common/hooks/useNetwork'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'

type Tab = 'SETTINGS' | 'LANGUAGE'

export const Settings = () => {
  const options: NetworkType[] = ['local', 'local-mocks', 'olympia-testnet']
  const [network, setNetwork] = useNetwork()
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
                    options={options}
                    value={network}
                    onChange={switchNetwork}
                    selectSize="l"
                  />
                  <NetworkInfo
                    detailsTitle={t('networkDetails')}
                    urlAddress={endpoints.membershipFaucetEndpoint}
                    networkAddress={endpoints.membershipFaucetEndpoint}
                    queryNodeAddress={endpoints.queryNodeEndpoint}
                  />
                </>
              )}
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
