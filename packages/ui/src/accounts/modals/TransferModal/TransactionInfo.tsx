import BN from 'bn.js'
import React from 'react'

import { Help } from '../../../common/components/Help'
import { BalanceInfoNarrow, InfoTitle, InfoValue } from '../../../common/components/Modal'
import { TokenValue } from '../../../common/components/typography'

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
