import React, { ReactNode } from 'react'

import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'

import { Tooltip } from '../Tooltip'

import { ButtonGhost, ButtonPrimary, ButtonProps } from '.'

interface WrapperProps {
  children: ReactNode
}

export const TransactionButtonWrapper = ({ children }: WrapperProps) => {
  const { isTransactionPending } = useTransactionStatus()

  if (isTransactionPending) {
    return <Tooltip tooltipText="Please wait until the current transaction is over">{children}</Tooltip>
  }

  return <>{children}</>
}

interface TransactionButtonProps extends ButtonProps {
  style: 'primary' | 'ghost'
}

export const TransactionButton = (props: TransactionButtonProps) => {
  const { isTransactionPending } = useTransactionStatus()
  const Button = props.style === 'ghost' ? ButtonGhost : ButtonPrimary

  return (
    <TransactionButtonWrapper>
      <Button {...props} disabled={isTransactionPending || props.disabled} />
    </TransactionButtonWrapper>
  )
}
