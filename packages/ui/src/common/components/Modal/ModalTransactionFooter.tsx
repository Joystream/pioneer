import BN from 'bn.js'
import React, { FC } from 'react'

import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'

import { TransactionFee } from '../TransactionFee'

interface ButtonState {
  disabled?: boolean
  label?: string
  onClick: () => void
}

interface Props {
  transactionFee?: BN
  prev?: ButtonState
  next: ButtonState
  className?: string
}

export const ModalTransactionFooter: FC<Props> = ({ transactionFee, prev, next, className, children }) => {
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
      <TransactionInfoContainer>
        {children}
        {transactionFee && <TransactionFee value={transactionFee} />}
      </TransactionInfoContainer>
      <ButtonsGroup align="right">
        <ButtonPrimary disabled={next.disabled} onClick={next.onClick} size="medium">
          {next.label ?? 'Next step'} <Arrow direction="right" />
        </ButtonPrimary>
      </ButtonsGroup>
    </ModalFooter>
  )
}
