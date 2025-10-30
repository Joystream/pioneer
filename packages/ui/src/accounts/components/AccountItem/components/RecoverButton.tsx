import React, { useCallback } from 'react'

import { isRecoverableLock, RecoverBalanceModalCall } from '@/accounts/modals/RecoverBalance'
import { BalanceLock } from '@/accounts/types'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'

interface Props {
  memberId?: string
  lock: BalanceLock
  address: string
  isRecoverable?: boolean
  isSmall?: boolean
}

export const RecoverButton = React.memo(({ memberId, lock, address, isRecoverable, isSmall }: Props) => {
  const { showModal } = useModal()
  const isVotingLock = lock.type === 'Voting'
  const onClick = useCallback(() => {
    if (isRecoverableLock(lock)) {
      showModal<RecoverBalanceModalCall>({
        modal: 'RecoverBalance',
        data: { address, lock, memberId },
      })
    }
  }, [address, lock, memberId])

  if (!isRecoverable) {
    return null
  }

  return (
    <TransactionButton
      style="primary"
      size={isSmall ? 'small' : 'medium'}
      onClick={onClick}
      disabled={!isVotingLock && !memberId}
    >
      Recover
    </TransactionButton>
  )
})
