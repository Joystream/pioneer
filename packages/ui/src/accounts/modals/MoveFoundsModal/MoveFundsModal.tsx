import React from 'react'
import { useHistory } from 'react-router-dom'

import { useAccounts } from '@/accounts/hooks/useAccounts'
import { useBalances } from '@/accounts/hooks/useBalances'
import { useTotalBalances } from '@/accounts/hooks/useTotalBalances'
import { useModal } from '@/common/hooks/useModal'

import { MoveFundsModalCall } from '.'
import { MoveFoundsLockedModal } from './MoveFoundsLockedModal'
import { MoveFoundsTransferableModal } from './MoveFoundsTransferableModal'

export const MoveFundsModal = () => {
  const {
    hideModal,
    modalData: { price },
  } = useModal<MoveFundsModalCall>()
  const { transferable, locked } = useTotalBalances()
  const { push } = useHistory()
  const balances = useBalances()
  const { allAccounts } = useAccounts()
  const transferableToNumber = transferable.toNumber()
  const lockedToNumber = locked.toNumber()

  const onManageAccountsClick = (): void => {
    hideModal()
    push('/profile')
  }

  if (transferableToNumber >= price) {
    return (
      <MoveFoundsTransferableModal
        onClose={hideModal}
        onManageAccountsClick={onManageAccountsClick}
        price={price}
        balances={balances}
        allAccounts={allAccounts}
      />
    )
  }

  if (transferable.toNumber() && lockedToNumber + transferableToNumber >= price) {
    return (
      <MoveFoundsLockedModal
        onClose={hideModal}
        onManageAccountsClick={onManageAccountsClick}
        price={price}
        balances={balances}
        allAccounts={allAccounts}
      />
    )
  }

  return null
}
