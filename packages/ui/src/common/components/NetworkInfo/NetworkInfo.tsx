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
  networkAddress: string
  queryNodeAddress: string
  faucetAddress?: string
}

const NetworkInfo: React.FC<NetworkInfoProps> = React.memo(
  ({ detailsTitle, networkAddress, queryNodeAddress, faucetAddress }) => {
    const { t } = useTranslation('settings')
    return (
      <SettingsInformation title={detailsTitle} icon={<WarnedIcon />}>
        <ColumnGapBlock gap={3}>
          <TextMedium lighter>{t('networkAddress')}</TextMedium>
          <CopyText copyText={networkAddress} />
        </ColumnGapBlock>
        <ColumnGapBlock gap={3}>
          <TextMedium lighter>{t('QueryNodeAddress')}</TextMedium>
          <CopyText copyText={queryNodeAddress} />
        </ColumnGapBlock>
        <ColumnGapBlock gap={3}>
          <TextMedium lighter>{t('faucet')}</TextMedium>
          <CopyText copyText={faucetAddress ?? 'none'} disabled={!faucetAddress} />
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
`
