import React from 'react'
import { useHistory } from 'react-router-dom'

import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { useModal } from '@/common/hooks/useModal'

import { MoveFundsModalCall } from '.'
import { MoveFoundsInsufficientBalanceModal } from './MoveFoundsInsufficientBalanceModal'
import { MoveFoundsLockedModal } from './MoveFoundsLockedModal'
import { MoveFoundsTransferableModal } from './MoveFoundsTransferableModal'

export const MoveFundsModal = () => {
  const {
    hideModal,
    modalData: { requiredStake, accounts, lockedFoundsAccounts },
  } = useModal<MoveFundsModalCall>()
  const { push } = useHistory()
  const balances = useMyBalances()

  const onManageAccountsClick = (): void => {
    hideModal()
    push('/profile')
  }

  if (accounts) {
    return (
      <MoveFoundsTransferableModal
        onClose={hideModal}
        onManageAccountsClick={onManageAccountsClick}
        requiredStake={requiredStake}
        balances={balances}
        accounts={accounts}
      />
    )
  } else if (lockedFoundsAccounts && Object.keys(lockedFoundsAccounts).length) {
    return (
      <MoveFoundsLockedModal
        onClose={hideModal}
        onManageAccountsClick={onManageAccountsClick}
        requiredStake={requiredStake}
        balances={balances}
      />
    )
  } else {
    return (
      <MoveFoundsInsufficientBalanceModal
        onClose={hideModal}
        onManageAccountsClick={onManageAccountsClick}
        requiredStake={requiredStake}
      />
    )
  }
}
