import * as React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { CopyComponent } from '@/common/components/CopyComponent'
import { WarnedIcon } from '@/common/components/icons/activities'
import { Info } from '@/common/components/Info'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export interface NetworkInfoProps {
  detailsTitle: string
  urlAddress: string
  networkIp: string
  queryNodeIp: string
}

const NetworkInfo: React.FC<NetworkInfoProps> = React.memo(({ detailsTitle, urlAddress, networkIp, queryNodeIp }) => {
  const { t } = useTranslation('settings')
  return (
    <NetworkDetailsWrapper>
      <Info>
        <DetailsItemWrapper>
          <WarnedIcon />
          <StyledDetailsText bold>{detailsTitle}</StyledDetailsText>
        </DetailsItemWrapper>
        <DetailsItemWrapper>
          <TextMedium lighter>{t('networkIp')}</TextMedium>
          <CopyText copyText={networkIp} />
        </DetailsItemWrapper>
        <DetailsItemWrapper>
          <TextMedium lighter>{t('QueryNodeIp')}</TextMedium>
          <CopyText copyText={queryNodeIp} />
        </DetailsItemWrapper>
        <DetailsItemWrapper>
          <TextMedium lighter>{t('url')}</TextMedium>
          <CopyText copyText={urlAddress} />
        </DetailsItemWrapper>
      </Info>
    </NetworkDetailsWrapper>
  )
})

NetworkInfo.displayName = 'NetworkInfo'

export default NetworkInfo

export const NetworkDetailsWrapper = styled.div`
  background-color: ${Colors.Blue[50]};
`

export const DetailsItemWrapper = styled.div`
  display: flex;
`

export const StyledDetailsText = styled(TextMedium)`
  margin-left: 15px;
`

export const CopyText = styled(CopyComponent)`
  font-size: 14px;
  margin-left: 5px;
`
