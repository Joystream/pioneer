import React, { FC } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { ModalFooter } from '@/common/components/Modal'
import { TokenValue } from '@/common/components/typography'

interface ButtonState {
  disabled?: boolean
  label?: string
  onClick: () => void
}

interface Props {
  prev?: ButtonState
  next: ButtonState
  className?: 'string'
}

export const ModalTransactionFooter: FC<Props> = ({ prev, next, className, children }) => {
  const { feeInfo } = useTransactionFee()

  return (
    <ModalFooter className={className} twoColumns>
      <ButtonsGroup align="left">
        {prev && !prev.disabled && (
          <ButtonGhost onClick={prev.onClick} size="medium">
            <Arrow direction="left" />
            {prev.label ?? 'Previous step'}
          </ButtonGhost>
        )}
      </ButtonsGroup>
      <ButtonsGroup align="right">
        {children}
        Transaction Fee: <TokenValue value={feeInfo?.transactionFee} />
        <ButtonPrimary disabled={next.disabled} onClick={next.onClick} size="medium">
          {next.label ?? 'Next step'} <Arrow direction="right" />
        </ButtonPrimary>
      </ButtonsGroup>
    </ModalFooter>
  )
}
