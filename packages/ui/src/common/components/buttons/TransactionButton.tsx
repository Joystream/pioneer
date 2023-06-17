import React, { ReactNode } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'

import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'

import { Tooltip } from '../Tooltip'

import { ButtonGhost, ButtonPrimary, ButtonProps, ButtonSecondary } from '.'

interface WrapperProps {
  children: ReactNode
  tooltip: { [key: string]: string }
}

export const TransactionButtonWrapper = ({ children, tooltip }: WrapperProps) => {
  const { isTransactionPending } = useTransactionStatus()

  if (isTransactionPending) {
    return <Tooltip tooltipText="Please wait until the current transaction is over">{children}</Tooltip>
  }

  if (tooltip) {
    return (
      <Tooltip placement="bottom-end" {...tooltip}>
        {children}
      </Tooltip>
    )
  }

  return <>{children}</>
}

type StyleOption = 'primary' | 'ghost' | 'secondary'

interface TransactionButtonProps extends ButtonProps {
  style: StyleOption
  tooltip: { [key: string]: string }
}

export const TransactionButton = (props: TransactionButtonProps) => {
  const { isTransactionPending } = useTransactionStatus()

  const Button = buttonTypes[props.style]

  return (
    <TransactionButtonWrapper tooltip={props.tooltip}>
      <Button {...props} disabled={isTransactionPending || props.disabled} />
    </TransactionButtonWrapper>
  )
}

const buttonTypes: Record<StyleOption, (props: ButtonProps) => ReactElement> = {
  primary: ButtonPrimary,
  secondary: ButtonSecondary,
  ghost: ButtonGhost,
}
