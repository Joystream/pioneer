import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { BalanceInfoNarrow, InfoTitle, InfoValue } from './Modal'
import { Tooltip, TooltipDefault } from './Tooltip'
import { TokenValue } from './typography'

export interface TransactionFeeProps {
  title: string
  value?: BN
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
  return (
    <BalanceInfoNarrow>
      <FeeWrapper>
        <InfoTitle>{title}</InfoTitle>
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
