import React from 'react'

import { useAccounts } from '@/accounts/hooks/useAccounts'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal/index'
import { Account, AddressToBalanceMap } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'

import { MoveFoundsAccountItem } from './MoveFoundsAccountItem'
import { ModalBody } from './styles'

export interface MoveFoundsLockedModalProps {
  onClose: () => void
  onManageAccountsClick: () => void
  requiredStake: number
  balances: AddressToBalanceMap
  accounts?: Account[]
}

export const MoveFoundsLockedModal = ({
  onClose,
  onManageAccountsClick,
  requiredStake,
  balances,
  accounts,
}: MoveFoundsLockedModalProps) => {
  const { allAccounts } = useAccounts()
  const {
    modalData: { lockedFoundsAccounts },
  } = useModal<MoveFundsModalCall>()

  if (!accounts || !accounts.length) {
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
        {lockedFoundsAccounts &&
          Object.keys(lockedFoundsAccounts).map((address) => (
            <MoveFoundsAccountItem
              key={address}
              account={allAccounts.find((account) => account.address === address)}
              balances={balances}
            />
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
