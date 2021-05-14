import BN from 'bn.js'
import React from 'react'

import { Help } from './Help'
import { BalanceInfoNarrow, InfoTitle, InfoValue } from './Modal'
import { TokenValue } from './typography'

interface TransactionInfoProps {
  title: string
  value?: BN
  helperText?: string
  helperTitle?: string
  helperLinkText?: React.ReactNode
  helperLinkURL?: string
}

export const TransactionInfo = ({
  title,
  value,
  helperText,
  helperTitle,
  helperLinkText,
  helperLinkURL,
}: TransactionInfoProps) => {
  return (
    <BalanceInfoNarrow>
      <InfoTitle>{title}</InfoTitle>
      <InfoValue>
        <TokenValue value={value} />
      </InfoValue>
      {helperText && (
        <Help
          helperTitle={helperTitle}
          helperLinkText={helperLinkText}
          helperText={helperText}
          helperLinkURL={helperLinkURL}
          absolute
        />
      )}
    </BalanceInfoNarrow>
  )
}
