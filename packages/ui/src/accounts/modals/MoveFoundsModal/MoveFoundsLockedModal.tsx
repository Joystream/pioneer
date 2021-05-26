import React from 'react'

import { Account, AddressToBalanceMap } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'

import { MoveFoundsAccountItem } from './MoveFoundsAccountItem'
import { ModalBody } from './styles'

export interface MoveFoundsLockedModalProps {
  onClose: () => void
  onManageAccountsClick: () => void
  requiredStake: number
  balances: AddressToBalanceMap
  accounts: Account[]
}

export const MoveFoundsLockedModal = ({
  onClose,
  onManageAccountsClick,
  requiredStake,
  balances,
  accounts,
}: MoveFoundsLockedModalProps) => {
  if (!accounts.length) {
    return null
  }

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Move founds into a locked account" />
      <ModalBody>
        <TextMedium margin="l">
          Unfortunately, you don’t have any accounts suitable for applying to this role. You need at least{' '}
          <TokenValue value={requiredStake} /> to apply for this role. Please move your funds.
        </TextMedium>
        <TextMedium margin="s" bold>
          Accounts with locked balances:
        </TextMedium>
        {accounts.map((account) => (
          <MoveFoundsAccountItem account={account} balances={balances} />
        ))}
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onManageAccountsClick}>
          Manage your accounts
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
