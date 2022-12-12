import BN from 'bn.js'
import React, { FC, ReactNode } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'

import { TransactionFee } from '../TransactionFee'

interface ButtonState {
  disabled?: boolean
  label?: ReactNode
  onClick: () => void
}

interface Props {
  transactionFee?: BN
  prev?: ButtonState
  next: ButtonState
  className?: string
  extraButtons?: ReactNode
  extraLeftButtons?: ReactNode
}

export const ModalTransactionFooter: FC<Props> = ({
  extraButtons,
  extraLeftButtons,
  transactionFee,
  prev,
  next,
  className,
  children,
}) => {
  const { feeInfo } = useTransactionFee()
  return (
    <ModalFooter className={className} twoColumns>
      <ButtonsGroup align="left">
        {extraLeftButtons}
        {prev && !prev.disabled && (
          <ButtonGhost onClick={prev.onClick} size="medium">
            <Arrow direction="left" />
            {prev.label ?? 'Previous step'}
          </ButtonGhost>
        )}
      </ButtonsGroup>
      <TransactionInfoContainer>
        {children}
        {(transactionFee || feeInfo) && <TransactionFee value={transactionFee ?? (feeInfo?.transactionFee as BN)} />}
      </TransactionInfoContainer>
      <ButtonsGroup align="right">
        {extraButtons}
        <ButtonPrimary disabled={next.disabled} onClick={next.onClick} size="medium">
          {next.label ?? 'Next step'} <Arrow direction="right" />
        </ButtonPrimary>
      </ButtonsGroup>
    </ModalFooter>
  )
}
