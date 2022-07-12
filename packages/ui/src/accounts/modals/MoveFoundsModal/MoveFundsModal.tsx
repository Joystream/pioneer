import BN from 'bn.js'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { useModal } from '@/common/hooks/useModal'

import { MoveFundsModalCall } from '.'
import { MoveFundsInsufficientBalanceModal } from './MoveFundsInsufficientBalanceModal'
import { MoveFundsLockedModal } from './MoveFundsLockedModal'
import { MoveFundsTransferableModal } from './MoveFundsTransferableModal'

export const MoveFundsModal = () => {
  const {
    hideModal,
    modalData: { requiredStake, accountsWithTransferableBalance, accountsWithCompatibleLocks, lock },
  } = useModal<MoveFundsModalCall>()
  const { push } = useHistory()
  const balances = useMyBalances()

  const onManageAccountsClick = (): void => {
    hideModal()
    push('/profile')
  }

  if (accountsWithTransferableBalance) {
    return (
      <MoveFundsTransferableModal
        onClose={hideModal}
        onManageAccountsClick={onManageAccountsClick}
        requiredStake={new BN(requiredStake)}
        balances={balances}
        accounts={accountsWithTransferableBalance}
        lock={lock}
      />
    )
  } else if (accountsWithCompatibleLocks && Object.keys(accountsWithCompatibleLocks).length) {
    return (
      <MoveFundsLockedModal
        onClose={hideModal}
        onManageAccountsClick={onManageAccountsClick}
        requiredStake={new BN(requiredStake)}
        balances={balances}
      />
    )
  } else {
    return (
      <MoveFundsInsufficientBalanceModal
        onClose={hideModal}
        onManageAccountsClick={onManageAccountsClick}
        requiredStake={new BN(requiredStake)}
      />
    )
  }
}
