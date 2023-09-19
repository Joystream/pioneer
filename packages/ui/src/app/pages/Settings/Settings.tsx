import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useApi } from '@/api/hooks/useApi'
import { PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { NetworkType, NetworkEndpoints } from '@/app/config'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputText } from '@/common/components/forms'
import { WarnedIcon } from '@/common/components/icons/activities'
// import { LanguageSelect } from '@/common/components/LanguageSelect'
import NetworkInfo from '@/common/components/NetworkInfo/NetworkInfo'
import { ColumnGapBlock, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PolkadotAppInfo } from '@/common/components/PolkadotAppInfo'
import { SimpleSelect } from '@/common/components/selects'
import { SettingsInformation, SettingsWarningInformation } from '@/common/components/SettingsInformation'
import { Tabs } from '@/common/components/Tabs'
import { TextMedium } from '@/common/components/typography'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
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

  const [customFaucetEndpoint, setCustomFaucetEndpoint] = useState<string>('')
  const [customRpcEndpoint, setCustomRpcEndpoint] = useState<string>('')
  const [customQueryEndpoint, setCustomQueryEndpoint] = useState<string>('')
  const [, storeCustomEndpoints] = useLocalStorage<NetworkEndpoints>('custom_endpoint')

  const switchNetwork = (network: NetworkType | null) => {
    if (network) {
      setNetwork(network)
      window.location.reload()
    }
  }

  useEffect(() => {
    if (network === 'custom') {
      setCustomRpcEndpoint(endpoints.nodeRpcEndpoint)
      setCustomQueryEndpoint(endpoints.queryNodeEndpoint)
      setCustomFaucetEndpoint(endpoints.membershipFaucetEndpoint)
    }
  }, [network, endpoints])

  const saveSettings = () => {
    if (
      /^(http|https):\/\//i.test(customFaucetEndpoint) === false ||
      /^(ws|wss):\/\//i.test(customRpcEndpoint) === false ||
      /^(http|https):\/\//i.test(customQueryEndpoint) === false
    )
      return

    storeCustomEndpoints({
      nodeRpcEndpoint: customRpcEndpoint,
      queryNodeEndpoint: customQueryEndpoint,
      membershipFaucetEndpoint: customFaucetEndpoint,
      queryNodeEndpointSubscription: customQueryEndpoint.replace(/^http?/, 'ws'),
      configEndpoint: undefined,
    })
    window.location.reload()
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
                  {network == 'custom' && (
                    <>
                      <SettingsWarningInformation icon={<WarnedIcon />} title="Attention">
                        <ColumnGapBlock gap={5}>
                          <TextMedium lighter>
                            Please beware that using 3rd party QN may result in fraud. Only use trusted providers
                          </TextMedium>
                        </ColumnGapBlock>
                      </SettingsWarningInformation>
                      <InputComponent
                        label={t('customFaucet')}
                        validation={/^(http|https):\/\//i.test(customFaucetEndpoint) ? undefined : 'invalid'}
                        message={
                          /^(http|https):\/\//i.test(customFaucetEndpoint)
                            ? undefined
                            : 'This Faucet endpoint must start with http or https'
                        }
                      >
                        <InputText
                          id="field-custom-faucet"
                          placeholder="Paste faucet URL address"
                          value={customFaucetEndpoint}
                          onChange={(e) => setCustomFaucetEndpoint(e.target.value)}
                        />
                      </InputComponent>
                      <InputComponent
                        label={t('customRPCNode')}
                        validation={/^(ws|wss):\/\//i.test(customRpcEndpoint) ? undefined : 'invalid'}
                        message={
                          /^(ws|wss):\/\//i.test(customRpcEndpoint)
                            ? undefined
                            : 'This RPC endpoint must start with ws or wss'
                        }
                      >
                        <InputText
                          id="field-custom-rpcnode"
                          placeholder="Paste RPC node"
                          value={customRpcEndpoint}
                          onChange={(e) => setCustomRpcEndpoint(e.target.value)}
                        />
                      </InputComponent>
                      <InputComponent
                        label={t('customQueryNode')}
                        validation={/^(http|https):\/\//i.test(customQueryEndpoint) ? undefined : 'invalid'}
                        message={
                          /^(http|https):\/\//i.test(customQueryEndpoint)
                            ? undefined
                            : 'This Query endpoint must start with http or https'
                        }
                      >
                        <InputText
                          id="field-custom-querynode"
                          placeholder="Paste Query node"
                          value={customQueryEndpoint}
                          onChange={(e) => setCustomQueryEndpoint(e.target.value)}
                        />
                      </InputComponent>
                      <ButtonPrimary onClick={saveSettings} size="medium">
                        Save settings
                      </ButtonPrimary>
                    </>
                  )}
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
