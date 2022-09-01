import BN from 'bn.js'
import React from 'react'
import { useTranslation } from 'react-i18next'

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
}

export const TransactionFee = ({
  title,
  value,
  tooltipText,
  tooltipTitle,
  tooltipLinkText,
  tooltipLinkURL,
}: TransactionFeeProps) => {
  const { t } = useTranslation()
  return (
    <BalanceInfoNarrow>
      <InfoTitle>{title ?? t('modals.transactionFee.label')}</InfoTitle>
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
