import React, { ReactNode } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'

import { useResponsive } from '@/common/hooks/useResponsive'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'

import { Tooltip } from '../Tooltip'

import { ButtonGhost, ButtonPrimary, ButtonProps, ButtonSecondary } from '.'

interface WrapperProps {
  children: ReactNode
  isResponsive?: boolean
}

export const TransactionButtonWrapper = ({ isResponsive, children }: WrapperProps) => {
  const { isTransactionPending } = useTransactionStatus()
  const { size } = useResponsive()

  if (!isResponsive && (size === 'xxs' || size === 'xs')) return null

  if (isTransactionPending) {
    return <Tooltip tooltipText="Please wait until the current transaction is over">{children}</Tooltip>
  }

  return <>{children}</>
}

type StyleOption = 'primary' | 'ghost' | 'secondary'

interface TransactionButtonProps extends ButtonProps {
  style: StyleOption
  isResponsive?: boolean
}

export const TransactionButton = ({ isResponsive, disabled, style, ...props }: TransactionButtonProps) => {
  const { isTransactionPending } = useTransactionStatus()

  const Button = buttonTypes[style]

  return (
    <TransactionButtonWrapper isResponsive={isResponsive}>
      <Button {...props} disabled={isTransactionPending || disabled} />
    </TransactionButtonWrapper>
  )
}

const buttonTypes: Record<StyleOption, (props: ButtonProps) => ReactElement> = {
  primary: ButtonPrimary,
  secondary: ButtonSecondary,
  ghost: ButtonGhost,
}
