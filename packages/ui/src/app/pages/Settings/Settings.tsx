import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useApi } from '@/api/hooks/useApi'
import { PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { NetworkType } from '@/app/config'
import { ButtonPrimary } from '@/common/components/buttons'
import { WarnedIcon } from '@/common/components/icons/activities'
// import { LanguageSelect } from '@/common/components/LanguageSelect'
import NetworkInfo from '@/common/components/NetworkInfo/NetworkInfo'
import { ColumnGapBlock, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PolkadotAppInfo } from '@/common/components/PolkadotAppInfo'
import { SimpleSelect } from '@/common/components/selects'
import { SettingsInformation } from '@/common/components/SettingsInformation'
import { Tabs } from '@/common/components/Tabs'
import { TextMedium } from '@/common/components/typography'
import { useNetwork } from '@/common/hooks/useNetwork'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { useObservable } from '@/common/hooks/useObservable'
import { useQueryNodeStateSubscription } from '@/common/hooks/useQueryNode'
import { formatTokenValue } from '@/common/model/formatters'

type Tab = 'SETTINGS' | 'LANGUAGE'

export const Settings = () => {
  const { api } = useApi()
  const header = useObservable(() => api?.rpc.chain.subscribeNewHeads(), [api?.isConnected])
  const { queryNodeState } = useQueryNodeStateSubscription({ shouldResubscribe: true })
  const { network, setNetwork, networks } = useNetwork()
  const { t } = useTranslation('settings')
  const [endpoints, fetchNetworkEndpoints] = useNetworkEndpoints()
  const [currentTab, setCurrentTab] = useState<Tab>('SETTINGS')
  const tabs = [
    { title: t('network'), active: currentTab === 'SETTINGS', onClick: () => setCurrentTab('SETTINGS') },
    //{ title: t('language'), active: currentTab === 'LANGUAGE', onClick: () => setCurrentTab('LANGUAGE') },
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
              {/**currentTab === 'LANGUAGE' && <LanguageSelect />**/}
              {currentTab === 'SETTINGS' && (
                <>
                  <SimpleSelect
                    title={t('selectNetwork')}
                    options={networks}
                    value={network}
                    onChange={switchNetwork}
                    selectSize="l"
                  />
                  {endpoints?.configEndpoint && (
                    <ButtonPrimary
                      onClick={() => fetchNetworkEndpoints(endpoints.configEndpoint as string)}
                      size="medium"
                    >
                      Refresh config
                    </ButtonPrimary>
                  )}
                  <NetworkInfo
                    detailsTitle={t('networkDetails')}
                    networkAddress={endpoints.nodeRpcEndpoint}
                    queryNodeAddress={endpoints.queryNodeEndpoint}
                    faucetAddress={endpoints.membershipFaucetEndpoint}
                  />
                  <PolkadotAppInfo rpcUrl={endpoints.nodeRpcEndpoint} />
                </>
              )}
              <SettingsInformation icon={<WarnedIcon />} title={t('chainInfo')}>
                <ColumnGapBlock gap={5}>
                  <TextMedium lighter>{t('rpcBlockheight')}</TextMedium>
                  <TextMedium lighter>{formatTokenValue(header?.number.toNumber())}</TextMedium>
                </ColumnGapBlock>
                <ColumnGapBlock gap={5}>
                  <TextMedium lighter>{t('qnBlockheight')}</TextMedium>
                  <TextMedium lighter>{formatTokenValue(queryNodeState?.indexerHead)}</TextMedium>
                </ColumnGapBlock>
              </SettingsInformation>
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
