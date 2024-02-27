import BN from 'bn.js'
import React, { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'

import { TransactionInfo } from '../TransactionInfo'

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
  const { t } = useTranslation()

  return (
    <ModalFooter className={className}>
      {(extraLeftButtons || (prev && !prev.disabled)) && (
        <ButtonsGroup align="left">
          {prev && !prev.disabled && (
            <ButtonGhost onClick={prev.onClick} size="medium">
              <Arrow direction="left" />
              {prev.label ?? 'Previous step'}
            </ButtonGhost>
          )}
          {extraLeftButtons}
        </ButtonsGroup>
      )}

      {(children || transactionFee || feeInfo) && (
        <TransactionInfoContainer>
          {children}
          {(transactionFee || feeInfo) && (
            <TransactionInfo
              title={t('modals.transactionFee.label')}
              value={transactionFee ?? (feeInfo?.transactionFee as BN)}
            />
          )}
        </TransactionInfoContainer>
      )}

      <MainButtonGroup>
        {extraButtons}
        <ButtonPrimary disabled={next.disabled} onClick={next.onClick} size="medium">
          {next.label ?? 'Next step'} <Arrow direction="right" />
        </ButtonPrimary>
      </MainButtonGroup>
    </ModalFooter>
  )
}

const MainButtonGroup = styled(ButtonsGroup)`
  justify-content: end;
`
