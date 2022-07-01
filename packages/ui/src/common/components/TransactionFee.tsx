import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { BN_ZERO } from '@/common/constants'
import { formatJoyValue } from '@/common/model/formatters'

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
  fullValue: BN
}

export const TransactionFee = ({
  title,
  value,
  tooltipText,
  tooltipTitle,
  tooltipLinkText,
  tooltipLinkURL,
}: TransactionFeeProps) => {
  const intValue = formatJoyValue(value ?? BN_ZERO, 10).toString()
  return (
    <BalanceInfoNarrow>
      <FeeWrapper>
        <InfoTitle>{title}</InfoTitle>
        <InfoValue>
          <Tooltip tooltipText={intValue} absolute>
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
