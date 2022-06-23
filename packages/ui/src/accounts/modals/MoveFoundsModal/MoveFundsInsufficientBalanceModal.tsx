import BN from 'bn.js'
import React from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'

import { ModalBody } from './styles'

export interface MoveFoundsInsufficientBalanceModalProps {
  onClose: () => void
  onManageAccountsClick: () => void
  requiredStake: BN
}

export const MoveFundsInsufficientBalanceModal = ({
  onClose,
  onManageAccountsClick,
  requiredStake,
}: MoveFoundsInsufficientBalanceModalProps) => {
  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="No founds" />
      <ModalBody>
        <TextMedium margin="l">
          Unfortunately, you don’t have any accounts suitable for applying to this role. You need at least{' '}
          <TokenValue value={requiredStake} /> to apply for this role.
        </TextMedium>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onManageAccountsClick}>
          Manage your accounts
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
