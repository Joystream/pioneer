import React, { useMemo } from 'react'

import { Account, AddressToBalanceMap } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'

import { MoveFoundsAccountItem } from './MoveFoundsAccountItem'
import { ModalBody } from './styles'

interface Props {
  onClose: () => void
  onManageAccountsClick: () => void
  price: number
  balances: AddressToBalanceMap
  allAccounts: Account[]
}

export const MoveFoundsLockedModal = ({ onClose, onManageAccountsClick, price, balances, allAccounts }: Props) => {
  const accounts = useMemo(() => {
    if (allAccounts.length) {
      return allAccounts.filter(
        (account) => balances[account.address] && balances[account.address].locked.toNumber() > 0
      )
    }
    return []
  }, [allAccounts, balances])

  if (!allAccounts.length) {
    return <></>
  }

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Move founds into a locked account" />
      <ModalBody>
        <TextMedium margin="l">
          Unfortunately, you don’t have any accounts suitable for applying to this role. You need at least{' '}
          <TokenValue value={price} /> to apply for this role. Please move your funds.
        </TextMedium>
        <TextMedium margin="s" bold>
          Accounts with locked balances:
        </TextMedium>
        {accounts.map((account) => (
          <MoveFoundsAccountItem account={account} />
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
