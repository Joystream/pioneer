import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useApi } from '@/api/hooks/useApi'
import { NetworkType, NetworkEndpoints } from '@/app/config'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputText } from '@/common/components/forms'
import { WarnedIcon } from '@/common/components/icons/activities'
import { Loading } from '@/common/components/Loading'
import NetworkInfo from '@/common/components/NetworkInfo/NetworkInfo'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { PolkadotAppInfo } from '@/common/components/PolkadotAppInfo'
import { SimpleSelect } from '@/common/components/selects'
import { SettingsInformation, SettingsWarningInformation } from '@/common/components/SettingsInformation'
import { TextMedium } from '@/common/components/typography'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useNetwork } from '@/common/hooks/useNetwork'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { useObservable } from '@/common/hooks/useObservable'
import { useQueryNodeStateSubscription } from '@/common/hooks/useQueryNode'
import { formatTokenValue } from '@/common/model/formatters'
import { cond } from '@/common/utils'

import { SettingsLayout } from './SettingsLayout'

export const SettingsNetworkTab = () => {
  const { api } = useApi()
  const header = useObservable(() => api?.rpc.chain.subscribeNewHeads(), [api?.isConnected])
  const { queryNodeState } = useQueryNodeStateSubscription({ shouldResubscribe: true })
  const { network, setNetwork, networks } = useNetwork()
  const { t } = useTranslation('settings')
  const [endpoints, fetchNetworkEndpoints] = useNetworkEndpoints()

  const form = useForm()
  const [customFaucetEndpoint, customRpcEndpoint, customQueryEndpoint, customBackendEndpoint] = form.watch([
    'settings.customFaucetEndpoint',
    'settings.customRpcEndpoint',
    'settings.customQueryEndpoint',
    'settings.customBackendEndpoint',
  ])
  const [, storeCustomEndpoints] = useLocalStorage<NetworkEndpoints>('custom_endpoint')
  const [isValidFaucetEndpoint, setIsValidFaucetEndpoint] = useState(true)
  const [isValidRpcEndpoint, setIsValidRpcEndpoint] = useState(true)
  const [isValidQueryEndpoint, setIsValidQueryEndpoint] = useState(true)
  const [isValidBackendEndpoint, setIsValidBackendEndpoint] = useState(true)
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
      form.setValue('settings.customBackendEndpoint', endpoints.backendEndpoint)
    }
  }, [network, endpoints])

  const checkFaucetEndpoint = async () => {
    // check faucet endpoint
    try {
      const faucetStatusEndpoint = customFaucetEndpoint.replace(new RegExp('register$'), 'status')
      const response = await fetch(faucetStatusEndpoint)
      const succeeded = response.status < 400
      setIsValidFaucetEndpoint(succeeded)
      return succeeded
    } catch {
      setIsValidFaucetEndpoint(false)
      return false
    }
  }

  const checkRpcEndpoint = async () => {
    // check RPC endpoint
    try {
      return await new Promise<boolean>((resolve) => {
        const ws = new WebSocket(customRpcEndpoint)
        const willResolveTo = (succeeded: boolean, timeout?: any) => () => {
          if (timeout) clearTimeout(timeout)

          ws.close()
          setIsValidRpcEndpoint(succeeded)
          resolve(succeeded)
        }

        const timeout = setTimeout(willResolveTo(false), 3000)
        ws.onopen = willResolveTo(true, timeout)
        ws.onerror = willResolveTo(false, timeout)
      })
    } catch {
      setIsValidRpcEndpoint(false)
      return false
    }
  }

  const checkGQLEndpoint = async (endpoint: string, setIsValidEndpoint: (v: boolean) => void) => {
    // check GraphQL endpoint
    try {
      const response = await fetch(endpoint + '?query=%7B__typename%7D')
      const succeeded = response.status < 400 && (await response.json()).data['__typename'] === 'Query'
      setIsValidEndpoint(succeeded)
      return succeeded
    } catch {
      setIsValidEndpoint(false)
      return false
    }
  }

  useEffect(() => {
    if (
      isValidFaucetEndpoint &&
      isValidRpcEndpoint &&
      isValidQueryEndpoint &&
      isValidBackendEndpoint &&
      customSaveStatus === 'Done'
    ) {
      storeCustomEndpoints({
        nodeRpcEndpoint: customRpcEndpoint,
        queryNodeEndpoint: customQueryEndpoint,
        membershipFaucetEndpoint: customFaucetEndpoint,
        queryNodeEndpointSubscription: customQueryEndpoint.replace(/^http?/, 'ws'),
        backendEndpoint: customBackendEndpoint,
        configEndpoint: undefined,
      })
      window.location.reload()
    }
  }, [isValidFaucetEndpoint, isValidRpcEndpoint, isValidQueryEndpoint, customSaveStatus])

  const saveSettings = async () => {
    if (
      !isValidUrl(customFaucetEndpoint) ||
      !isValidUrl(customRpcEndpoint, 'wss?') ||
      !isValidUrl(customQueryEndpoint) ||
      !isValidUrl(customBackendEndpoint)
    ) {
      return
    }

    setCustomSaveStatus('Saving')

    await Promise.all([
      checkFaucetEndpoint(),
      checkRpcEndpoint(),
      checkGQLEndpoint(customQueryEndpoint, setIsValidQueryEndpoint),
      checkGQLEndpoint(customBackendEndpoint, setIsValidBackendEndpoint),
    ])

    setCustomSaveStatus('Done')
  }

  return (
    <SettingsLayout>
      <Container>
        <RowGapBlock gap={32}>
          <SimpleSelect
            title={t('selectNetwork')}
            options={networks}
            value={network}
            onChange={switchNetwork}
            selectSize="l"
          />
          {network === 'custom' && (
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
                validation={isValidUrl(customFaucetEndpoint) && isValidFaucetEndpoint ? undefined : 'invalid'}
                message={cond(
                  [() => !isValidUrl(customFaucetEndpoint), 'This Faucet endpoint must start with http or https'],
                  [() => !isValidFaucetEndpoint, 'Connection Error']
                )}
              >
                <InputText
                  id="field-custom-faucet"
                  placeholder="Paste faucet URL address"
                  name="settings.customFaucetEndpoint"
                />
              </InputComponent>
              <InputComponent
                label={t('customRPCNode')}
                validation={isValidUrl(customRpcEndpoint, 'wss?') && isValidRpcEndpoint ? undefined : 'invalid'}
                message={cond(
                  [() => !isValidUrl(customRpcEndpoint, 'wss?'), 'This RPC endpoint must start with ws or wss'],
                  [
                    () => !isValidRpcEndpoint,
                    'Connection Error. Sometimes it fails due to network speed. Please try to check once more',
                  ]
                )}
              >
                <InputText id="field-custom-rpcnode" placeholder="Paste RPC node" name="settings.customRpcEndpoint" />
              </InputComponent>
              <InputComponent
                label={t('customQueryNode')}
                validation={isValidUrl(customQueryEndpoint) && isValidQueryEndpoint ? undefined : 'invalid'}
                message={cond(
                  [() => !isValidUrl(customQueryEndpoint), 'This Query endpoint must start with http or https'],
                  [() => !isValidQueryEndpoint, 'Connection Error']
                )}
              >
                <InputText
                  id="field-custom-querynode"
                  placeholder="Paste Query node"
                  name="settings.customQueryEndpoint"
                />
              </InputComponent>
              <InputComponent
                label={t('customBackend')}
                validation={isValidUrl(customBackendEndpoint) && isValidBackendEndpoint ? undefined : 'invalid'}
                message={cond(
                  [() => !isValidUrl(customBackendEndpoint), 'This Backend endpoint must start with http or https'],
                  [() => !isValidBackendEndpoint, 'Connection Error']
                )}
              >
                <InputText
                  id="field-custom-backend"
                  placeholder="Paste Backend endpoint"
                  name="settings.customBackendEndpoint"
                />
              </InputComponent>
              <ButtonPrimary onClick={saveSettings} size="medium">
                Save settings
                {customSaveStatus === 'Saving' && <Loading />}
              </ButtonPrimary>
            </FormProvider>
          )}
          {endpoints?.configEndpoint && (
            <ButtonPrimary onClick={() => fetchNetworkEndpoints(endpoints.configEndpoint as string)} size="medium">
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
      </Container>
    </SettingsLayout>
  )
}

const isValidUrl = (url: string, prefix = 'https?') => RegExp(String.raw`${prefix}://\w+/?`, 'i').test(url)

export const Container = styled.div`
  width: 60%;
`
