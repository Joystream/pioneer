import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useApi } from '@/api/hooks/useApi'
import { NetworkType } from '@/app/config'
import { ButtonPrimary } from '@/common/components/buttons'
import { WarnedIcon } from '@/common/components/icons/activities'
import NetworkInfo from '@/common/components/NetworkInfo/NetworkInfo'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { PolkadotAppInfo } from '@/common/components/PolkadotAppInfo'
import { SimpleSelect } from '@/common/components/selects'
import { SettingsInformation } from '@/common/components/SettingsInformation'
import { TextMedium } from '@/common/components/typography'
import { useNetwork } from '@/common/hooks/useNetwork'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { useObservable } from '@/common/hooks/useObservable'
import { useQueryNodeStateSubscription } from '@/common/hooks/useQueryNode'
import { formatTokenValue } from '@/common/model/formatters'

import { SettingsLayout } from './SettingsLayout'

export const SettingsNetworkTab = () => {
  const { api } = useApi()
  const header = useObservable(() => api?.rpc.chain.subscribeNewHeads(), [api?.isConnected])
  const { queryNodeState } = useQueryNodeStateSubscription({ shouldResubscribe: true })
  const { network, setNetwork, networks } = useNetwork()
  const { t } = useTranslation('settings')
  const [endpoints, fetchNetworkEndpoints] = useNetworkEndpoints()

  const switchNetwork = (network: NetworkType | null) => {
    if (network) {
      setNetwork(network)
      window.location.reload()
    }
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

export const Container = styled.div`
  width: 60%;
`
