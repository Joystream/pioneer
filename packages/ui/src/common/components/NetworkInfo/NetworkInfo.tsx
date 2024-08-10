import * as React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { CopyComponent } from '@/common/components/CopyComponent'
import { WarnedIcon } from '@/common/components/icons/activities'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { SettingsInformation } from '@/common/components/SettingsInformation'
import { TextMedium } from '@/common/components/typography'

export interface NetworkInfoProps {
  detailsTitle: string
  networkWsAddress: string
  networkHttpAddress: string
  queryNodeHttpAddress: string
  queryNodeWsAddress: string
  faucetAddress?: string
  backendAddress?: string
}

const NetworkInfo: React.FC<NetworkInfoProps> = React.memo(
  ({
    detailsTitle,
    networkWsAddress,
    networkHttpAddress,
    queryNodeHttpAddress,
    queryNodeWsAddress,
    faucetAddress,
    backendAddress,
  }) => {
    const { t } = useTranslation('settings')
    return (
      <SettingsInformation title={detailsTitle} icon={<WarnedIcon />}>
        <ColumnGapBlock gap={3}>
          <TextMedium lighter>{t('networkSubscriptionAddress')}</TextMedium>
          <CopyText copyText={networkWsAddress} />
        </ColumnGapBlock>
        <ColumnGapBlock gap={3}>
          <TextMedium lighter>{t('networkHTTPAddress')}</TextMedium>
          <CopyText copyText={networkHttpAddress} />
        </ColumnGapBlock>
        <ColumnGapBlock gap={3}>
          <TextMedium lighter>{t('QueryNodeHttpAddress')}</TextMedium>
          <CopyText copyText={queryNodeHttpAddress} />
        </ColumnGapBlock>
        <ColumnGapBlock gap={3}>
          <TextMedium lighter>{t('QueryNodeSubscriptionAddress')}</TextMedium>
          <CopyText copyText={queryNodeWsAddress} />
        </ColumnGapBlock>
        <ColumnGapBlock gap={3}>
          <TextMedium lighter>{t('faucet')}</TextMedium>
          <CopyText copyText={faucetAddress ?? 'none'} disabled={!faucetAddress} />
        </ColumnGapBlock>
        <ColumnGapBlock gap={3}>
          <TextMedium lighter>{t('backend')}</TextMedium>
          <CopyText copyText={backendAddress ?? 'none'} disabled={!backendAddress} />
        </ColumnGapBlock>
      </SettingsInformation>
    )
  }
)

NetworkInfo.displayName = 'NetworkInfo'

export default NetworkInfo

export const CopyText = styled(CopyComponent)`
  font-size: 14px;
  margin-left: 5px;

  > span {
    white-space: unset;
  }
`
