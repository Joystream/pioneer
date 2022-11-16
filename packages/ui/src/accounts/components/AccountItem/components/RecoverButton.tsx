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
  const onClick = useCallback(() => {
    if (!memberId) return

    if (isRecoverableLock(lock)) {
      showModal<RecoverBalanceModalCall>({
        modal: 'RecoverBalance',
        data: { address, lock, memberId },
      })
    }
  }, [address, lock, memberId])

  if (!isRecoverable || !memberId) {
    return null
  }

  return (
    <TransactionButton style="primary" size={isSmall ? 'small' : 'medium'} onClick={onClick}>
      Recover
    </TransactionButton>
  )
})
