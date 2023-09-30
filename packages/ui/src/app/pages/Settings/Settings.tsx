import { WsProvider } from '@polkadot/api'
import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useApi } from '@/api/hooks/useApi'
import { PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { NetworkType, NetworkEndpoints } from '@/app/config'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputText } from '@/common/components/forms'
import { WarnedIcon } from '@/common/components/icons/activities'
// import { LanguageSelect } from '@/common/components/LanguageSelect'
import { Loading } from '@/common/components/Loading'
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

  const form = useForm()
  const [customFaucetEndpoint, customRpcEndpoint, customQueryEndpoint] = form.watch([
    'settings.customFaucetEndpoint',
    'settings.customRpcEndpoint',
    'settings.customQueryEndpoint',
  ])
  const [, storeCustomEndpoints] = useLocalStorage<NetworkEndpoints>('custom_endpoint')
  const [isValidFaucetEndpoint, setIsValidFaucetEndpoint] = useState(true)
  const [isValidRpcEndpoint, setIsValidRpcEndpoint] = useState(true)
  const [isValidQueryEndpoint, setIsValidQueryEndpoint] = useState(true)
  const [customSaveStatus, setCustomSaveStatus] = useState<'Init' | 'Saving' | 'Done'>('Init')

  const switchNetwork = (network: NetworkType | null) => {
    if (network) {
      setNetwork(network)
      window.location.reload()
    }
  }

  useEffect(() => {
    if (network === 'custom') {
      form.setValue('settings.customRpcEndpoint', endpoints.nodeRpcEndpoint)
      form.setValue('settings.customQueryEndpoint', endpoints.queryNodeEndpoint)
      form.setValue('settings.customFaucetEndpoint', endpoints.membershipFaucetEndpoint)
    }
  }, [network, endpoints])

  const saveSettings = () => {
    if (
      /^(http|https):\/\//i.test(customFaucetEndpoint) === false ||
      /^(ws|wss):\/\//i.test(customRpcEndpoint) === false ||
      /^(http|https):\/\//i.test(customQueryEndpoint) === false
    ) {
      return
    }

    setCustomSaveStatus('Saving')

    const _update = async () => {
      let needReload = true

      // check faucet endpoint
      try {
        const faucetStatusEndpoint = customFaucetEndpoint.replace(new RegExp('register$'), 'status')
        const response = await fetch(faucetStatusEndpoint)
        await response.json()
        setIsValidFaucetEndpoint(true)
      } catch (err) {
        setIsValidFaucetEndpoint(false)
        needReload = false
      }

      // check GraphQL endpoint
      try {
        const query = `
          query {
            electedCouncils{
              id
            }
          }`
        const response = await fetch(customQueryEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        })
        await response.json()
        setIsValidQueryEndpoint(true)
      } catch (err) {
        setIsValidQueryEndpoint(false)
        needReload = false
      }

      // check RPC endpoint
      try {
        const wsProvider = new WsProvider(customRpcEndpoint, false, undefined, 4000)
        await wsProvider.connect()
        setIsValidRpcEndpoint(true)
      } catch (err) {
        setIsValidRpcEndpoint(false)
        needReload = false
      }

      setCustomSaveStatus('Done')

      if (needReload === true) {
        storeCustomEndpoints({
          nodeRpcEndpoint: customRpcEndpoint,
          queryNodeEndpoint: customQueryEndpoint,
          membershipFaucetEndpoint: customFaucetEndpoint,
          queryNodeEndpointSubscription: customQueryEndpoint.replace(/^http?/, 'ws'),
          configEndpoint: undefined,
        })
        window.location.reload()
      }
    }

    _update()
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
                    <FormProvider {...form}>
                      <SettingsWarningInformation icon={<WarnedIcon />} title="Attention">
                        <ColumnGapBlock gap={5}>
                          <TextMedium lighter>
                            Please beware that using 3rd party QN may result in fraud. Only use trusted providers
                          </TextMedium>
                        </ColumnGapBlock>
                      </SettingsWarningInformation>
                      <InputComponent
                        label={t('customFaucet')}
                        validation={
                          /^(http|https):\/\//i.test(customFaucetEndpoint) && isValidFaucetEndpoint
                            ? undefined
                            : 'invalid'
                        }
                        message={
                          /^(http|https):\/\//i.test(customFaucetEndpoint)
                            ? isValidFaucetEndpoint
                              ? undefined
                              : 'Connection Error'
                            : 'This Faucet endpoint must start with http or https'
                        }
                      >
                        <InputText
                          id="field-custom-faucet"
                          placeholder="Paste faucet URL address"
                          name="settings.customFaucetEndpoint"
                        />
                      </InputComponent>
                      <InputComponent
                        label={t('customRPCNode')}
                        validation={
                          /^(ws|wss):\/\//i.test(customRpcEndpoint) && isValidRpcEndpoint ? undefined : 'invalid'
                        }
                        message={
                          /^(ws|wss):\/\//i.test(customRpcEndpoint)
                            ? isValidRpcEndpoint
                              ? undefined
                              : 'Connection Error'
                            : 'This RPC endpoint must start with ws or wss'
                        }
                      >
                        <InputText
                          id="field-custom-rpcnode"
                          placeholder="Paste RPC node"
                          name="settings.customRpcEndpoint"
                        />
                      </InputComponent>
                      <InputComponent
                        label={t('customQueryNode')}
                        validation={
                          /^(http|https):\/\//i.test(customQueryEndpoint) && isValidQueryEndpoint
                            ? undefined
                            : 'invalid'
                        }
                        message={
                          /^(http|https):\/\//i.test(customQueryEndpoint)
                            ? isValidQueryEndpoint
                              ? undefined
                              : 'Connection Error'
                            : 'This Query endpoint must start with http or https'
                        }
                      >
                        <InputText
                          id="field-custom-querynode"
                          placeholder="Paste Query node"
                          name="settings.customQueryEndpoint"
                        />
                      </InputComponent>
                      <ButtonPrimary onClick={saveSettings} size="medium">
                        Save settings
                        {customSaveStatus === 'Saving' && <Loading />}
                      </ButtonPrimary>
                    </FormProvider>
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
