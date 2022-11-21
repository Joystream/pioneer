import * as React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { CopyComponent } from '@/common/components/CopyComponent'
import { WarnedIcon } from '@/common/components/icons/activities'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

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
      <NetworkDetailsWrapper>
        <DetailsItemWrapper>
          <WarnedIcon />
          <StyledDetailsText bold>{detailsTitle}</StyledDetailsText>
        </DetailsItemWrapper>
        <DetailsItemWrapper>
          <TextMedium lighter>{t('networkAddress')}</TextMedium>
          <CopyText copyText={networkAddress} />
        </DetailsItemWrapper>
        <DetailsItemWrapper>
          <TextMedium lighter>{t('QueryNodeAddress')}</TextMedium>
          <CopyText copyText={queryNodeAddress} />
        </DetailsItemWrapper>
        <DetailsItemWrapper>
          <TextMedium lighter>{t('faucet')}</TextMedium>
          <CopyText copyText={faucetAddress ?? 'none'} disabled={!faucetAddress} />
        </DetailsItemWrapper>
      </NetworkDetailsWrapper>
    )
  }
)

NetworkInfo.displayName = 'NetworkInfo'

export default NetworkInfo

export const NetworkDetailsWrapper = styled.div`
  background-color: ${Colors.Blue[50]};
  padding: 16px;
`

export const DetailsItemWrapper = styled.div`
  display: flex;
`

export const StyledDetailsText = styled(TextMedium)`
  margin: 0 0 8px 8px;
`

export const CopyText = styled(CopyComponent)`
  font-size: 14px;
  margin-left: 5px;
`
