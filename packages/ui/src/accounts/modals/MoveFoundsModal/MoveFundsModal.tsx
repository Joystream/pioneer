import React from 'react'
import { useHistory } from 'react-router-dom'

import { useBalances } from '@/accounts/hooks/useBalances'
import { useModal } from '@/common/hooks/useModal'

import { MoveFundsModalCall } from '.'
import { MoveFoundsModalType } from './constants'
import { MoveFoundsInsufficientBalanceModal } from './MoveFoundsInsufficientBalanceModal'
import { MoveFoundsLockedModal } from './MoveFoundsLockedModal'
import { MoveFoundsTransferableModal } from './MoveFoundsTransferableModal'

export const MoveFundsModal = () => {
  const {
    hideModal,
    modalData: { requiredStake, type, accounts },
  } = useModal<MoveFundsModalCall>()
  const { push } = useHistory()
  const balances = useBalances()

  const onManageAccountsClick = (): void => {
    hideModal()
    push('/profile')
  }

  if (type === MoveFoundsModalType.TRANSFERABLE) {
    return (
      <MoveFoundsTransferableModal
        onClose={hideModal}
        onManageAccountsClick={onManageAccountsClick}
        requiredStake={requiredStake}
        balances={balances}
        accounts={accounts}
      />
    )
  }

  if (type === MoveFoundsModalType.LOCKED_FOUNDS) {
    return (
      <MoveFoundsLockedModal
        onClose={hideModal}
        onManageAccountsClick={onManageAccountsClick}
        requiredStake={requiredStake}
        balances={balances}
        accounts={accounts}
      />
    )
  }

  if (type === MoveFoundsModalType.NO_FOUNDS) {
    return (
      <MoveFoundsInsufficientBalanceModal
        onClose={hideModal}
        onManageAccountsClick={onManageAccountsClick}
        requiredStake={requiredStake}
      />
    )
  }

  return null
}
