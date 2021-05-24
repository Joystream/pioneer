import BN from 'bn.js'
import React from 'react'

import { BalanceInfoNarrow, InfoTitle, InfoValue } from './Modal'
import { Tooltip, TooltipDefault } from './Tooltip'
import { TokenValue } from './typography'

interface TransactionInfoProps {
  title: string
  value?: BN
  tooltipText?: string
  tooltipTitle?: string
  tooltipLinkText?: React.ReactNode
  tooltipLinkURL?: string
}

export const TransactionInfo = ({
  title,
  value,
  tooltipText,
  tooltipTitle,
  tooltipLinkText,
  tooltipLinkURL,
}: TransactionInfoProps) => {
  return (
    <BalanceInfoNarrow>
      <InfoTitle>{title}</InfoTitle>
      <InfoValue>
        <TokenValue value={value} />
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
    </BalanceInfoNarrow>
  )
}
