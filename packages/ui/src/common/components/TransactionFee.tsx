import BN from 'bn.js'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { BalanceInfoNarrow, InfoTitle, InfoValue } from './Modal'
import { Tooltip, TooltipDefault } from './Tooltip'
import { TokenValue } from './typography'

export interface TransactionFeeProps {
  title?: string
  value: BN
  tooltipText?: React.ReactNode
  tooltipTitle?: string
  tooltipLinkText?: React.ReactNode
  tooltipLinkURL?: string
  fullValue?: string
}

export const TransactionFee = ({
  title,
  value,
  tooltipText,
  tooltipTitle,
  tooltipLinkText,
  tooltipLinkURL,
  fullValue,
}: TransactionFeeProps) => {
  const { t } = useTranslation()
  return (
    <BalanceInfoNarrow>
      <FeeWrapper>
        <InfoTitle>{title ?? t('modals.transactionFee.label')}</InfoTitle>
        <InfoValue>
          <Tooltip tooltipText={fullValue} absolute>
            <StyledTokenValue value={value} />
          </Tooltip>
        </InfoValue>
        {tooltipText && (
          <Tooltip
            tooltipTitle={tooltipTitle}
            tooltipLinkText={tooltipLinkText}
            tooltipText={tooltipText}
            tooltipLinkURL={tooltipLinkURL}
            absolute
          >
            <TooltipDefault />
          </Tooltip>
        )}
      </FeeWrapper>
    </BalanceInfoNarrow>
  )
}

const FeeWrapper = styled.div`
  display: flex;
`
const StyledTokenValue = styled(TokenValue)`
  padding-right: 25px;
`
