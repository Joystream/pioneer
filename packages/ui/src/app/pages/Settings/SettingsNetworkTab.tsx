import { random } from 'lodash'
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
import { Colors } from '@/common/constants'
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
  const [customFaucetEndpoint, customWsRpcEndpoint, customHttpRpcEndpoint, customQueryEndpoint, customBackendEndpoint] =
    form.watch([
      'settings.customFaucetEndpoint',
      'settings.customWsRpcEndpoint',
      'settings.customHttpRpcEndpoint',
      'settings.customQueryEndpoint',
      'settings.customBackendEndpoint',
    ])
  const [, storeCustomEndpoints] = useLocalStorage<NetworkEndpoints>('custom_endpoint')
  const [isValidFaucetEndpoint, setIsValidFaucetEndpoint] = useState(true)
  const [isValidWsRpcEndpoint, setIsValidWsRpcEndpoint] = useState(true)
  const [isValidHttpRpcEndpoint, setIsValidHttpRpcEndpoint] = useState(true)
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
      form.setValue('settings.customWsRpcEndpoint', endpoints.nodeRpcEndpoint)
      form.setValue('settings.customHttpRpcEndpoint', endpoints.nodeHttpRpcEndpoint)
      form.setValue('settings.customQueryEndpoint', endpoints.queryNodeEndpoint)
      form.setValue('settings.customFaucetEndpoint', endpoints.membershipFaucetEndpoint ?? '')
      form.setValue('settings.customBackendEndpoint', endpoints.backendEndpoint ?? '')
    }
  }, [network, endpoints])

  useEffect(() => {
    if (
      isValidWsRpcEndpoint &&
      isValidHttpRpcEndpoint &&
      isValidQueryEndpoint &&
      isValidFaucetEndpoint &&
      isValidBackendEndpoint &&
      customSaveStatus === 'Done'
    ) {
      storeCustomEndpoints({
        nodeRpcEndpoint: customWsRpcEndpoint,
        nodeHttpRpcEndpoint: customHttpRpcEndpoint,
        queryNodeEndpoint: customQueryEndpoint,
        queryNodeEndpointSubscription: customQueryEndpoint.replace(/^http?/, 'ws'),
        membershipFaucetEndpoint: customFaucetEndpoint || undefined,
        backendEndpoint: customBackendEndpoint || undefined,
        configEndpoint: undefined,
      })
      window.location.reload()
    }
  }, [isValidFaucetEndpoint, isValidWsRpcEndpoint, isValidQueryEndpoint, customSaveStatus])

  const saveSettings = async () => {
    if (
      !isValidWsUrl(customWsRpcEndpoint) ||
      !isValidHttpUrl(customHttpRpcEndpoint) ||
      !isValidQNUrl(customQueryEndpoint) ||
      !isValidFaucetUrl(customFaucetEndpoint) ||
      !isValidBackendUrl(customBackendEndpoint)
    ) {
      return
    }

    setCustomSaveStatus('Saving')

    await Promise.all([
      checkEndpoint(customWsRpcEndpoint, checkWsRpcEndpoint, setIsValidWsRpcEndpoint),
      checkEndpoint(customHttpRpcEndpoint, checkHttpRpcEndpoint, setIsValidHttpRpcEndpoint),
      checkEndpoint(customQueryEndpoint, checkGQLEndpoint, setIsValidQueryEndpoint),
      checkEndpoint(customFaucetEndpoint, checkFaucetEndpoint, setIsValidFaucetEndpoint),
      checkEndpoint(customBackendEndpoint, checkGQLEndpoint, setIsValidBackendEndpoint),
    ])

    setCustomSaveStatus('Done')
  }

  return (
    <SettingsLayout>
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
              label={t('customWsRpcNode')}
              validation={isValidWsUrl(customWsRpcEndpoint) && isValidWsRpcEndpoint ? undefined : 'invalid'}
              message={cond(
                [() => !isValidWsUrl(customWsRpcEndpoint), 'This WS RPC endpoint must start with ws or wss'],
                [
                  () => !isValidWsRpcEndpoint,
                  'Connection Error. Sometimes it fails due to network speed. Please try to check once more',
                ]
              )}
            >
              <InputText
                id="field-custom-wsrpcnode"
                placeholder="Paste WS RPC node"
                name="settings.customWsRpcEndpoint"
              />
            </InputComponent>

            <InputComponent
              label={t('customHttpRpcNode')}
              validation={isValidHttpUrl(customHttpRpcEndpoint) && isValidHttpRpcEndpoint ? undefined : 'invalid'}
              message={cond(
                [() => !isValidHttpUrl(customHttpRpcEndpoint), 'This HTTP RPC endpoint must start with http or https'],
                [() => !isValidHttpRpcEndpoint, 'Connection Error']
              )}
            >
              <InputText
                id="field-custom-httprpcnode"
                placeholder="Paste HTTP RPC node"
                name="settings.customHttpRpcEndpoint"
              />
            </InputComponent>

            <InputComponent
              label={t('customQueryNode')}
              validation={isValidQNUrl(customQueryEndpoint) && isValidQueryEndpoint ? undefined : 'invalid'}
              message={cond(
                [() => !isValidQNUrl(customQueryEndpoint), 'This Query endpoint must start with http or https'],
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
              label={t('customFaucet')}
              validation={isValidFaucetUrl(customFaucetEndpoint) && isValidFaucetEndpoint ? undefined : 'invalid'}
              message={cond(
                [() => !isValidFaucetUrl(customFaucetEndpoint), 'This Faucet endpoint must start with http or https'],
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
              label={t('customBackend')}
              validation={isValidBackendUrl(customBackendEndpoint) && isValidBackendEndpoint ? undefined : 'invalid'}
              message={cond(
                [
                  () => !isValidBackendUrl(customBackendEndpoint),
                  'This Backend endpoint must start with http or https',
                ],
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
              {customSaveStatus === 'Saving' && <CustomLoading />}
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
          networkWsAddress={endpoints.nodeRpcEndpoint}
          networkHttpAddress={endpoints.nodeHttpRpcEndpoint}
          queryNodeHttpAddress={endpoints.queryNodeEndpoint}
          queryNodeWsAddress={endpoints.queryNodeEndpointSubscription}
          faucetAddress={endpoints.membershipFaucetEndpoint}
          backendAddress={endpoints.backendEndpoint}
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
    </SettingsLayout>
  )
}

type IsValidOptions = { prefix?: 'https?' | 'wss?'; isRequired?: boolean }
const isValid = (url: string, { prefix = 'https?', isRequired = true }: IsValidOptions = {}) =>
  (isRequired === false && url === '') || RegExp(String.raw`${prefix}://\w+/?`, 'i').test(url)

const isValidWsUrl = (url: string) => isValid(url, { prefix: 'wss?' })
const isValidHttpUrl = (url: string) => isValid(url, { prefix: 'https?' })
const isValidQNUrl = (url: string) => isValid(url)
const isValidFaucetUrl = (url: string) => isValid(url, { isRequired: false })
const isValidBackendUrl = (url: string) => isValid(url, { isRequired: false })

const checkEndpoint = async (
  endpoint: string,
  check: (endpoint: string) => Promise<boolean>,
  setEndpointIsValid: (isValid: boolean) => void
) => {
  const isValid = endpoint ? await check(endpoint) : true
  setEndpointIsValid(isValid)
  return isValid
}

const checkWsRpcEndpoint = async (endpoint: string) => {
  // check WS RPC endpoint
  try {
    return await new Promise<boolean>((resolve) => {
      const ws = new WebSocket(endpoint)
      const willResolveTo = (succeeded: boolean, timeout?: any) => () => {
        if (timeout) clearTimeout(timeout)
        ws.close()
        resolve(succeeded)
      }

      const timeout = setTimeout(willResolveTo(false), 3000)
      ws.onopen = willResolveTo(true, timeout)
      ws.onerror = willResolveTo(false, timeout)
    })
  } catch {
    return false
  }
}

const checkHttpRpcEndpoint = async (endpoint: string) => {
  // check HTTP RPC endpoint
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: random(Number.MAX_SAFE_INTEGER),
        jsonrpc: '2.0',
        method: 'system_name',
        params: [],
      }),
    })
    return response.status < 400 && (await response.json()).result === 'Joystream Node'
  } catch {
    return false
  }
}

const checkGQLEndpoint = async (endpoint: string) => {
  // check GraphQL endpoint
  try {
    const response = await fetch(endpoint + '?query=%7B__typename%7D')
    return response.status < 400 && (await response.json()).data['__typename'] === 'Query'
  } catch {
    return false
  }
}

const checkFaucetEndpoint = async (endpoint: string) => {
  // check faucet endpoint
  try {
    const faucetStatusEndpoint = endpoint.replace(new RegExp('register$'), 'status')
    const response = await fetch(faucetStatusEndpoint)
    return response.status < 400
  } catch {
    return false
  }
}

const CustomLoading = styled(Loading)`
  fill: ${Colors.White};
`
