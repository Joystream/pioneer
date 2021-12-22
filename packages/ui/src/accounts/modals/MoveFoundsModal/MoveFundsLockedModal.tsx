import React from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal/index'
import { AddressToBalanceMap } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'

import { MoveFundsAccountItem } from './MoveFundsAccountItem'
import { ModalBody } from './styles'

export interface MoveFoundsLockedModalProps {
  onClose: () => void
  onManageAccountsClick: () => void
  requiredStake: number
  balances: AddressToBalanceMap
}

export const MoveFundsLockedModal = ({
  onClose,
  onManageAccountsClick,
  requiredStake,
  balances,
}: MoveFoundsLockedModalProps) => {
  const { allAccounts } = useMyAccounts()
  const {
    modalData: { accountsWithCompatibleLocks },
  } = useModal<MoveFundsModalCall>()

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
        {accountsWithCompatibleLocks &&
          Object.keys(accountsWithCompatibleLocks).map((address) => (
            <MoveFundsAccountItem
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
