import React, { useCallback } from 'react'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useIsWGLockRecoverable } from '@/accounts/hooks/useGroupLocks'
import { RecoverableLock, RecoverBalanceModalCall } from '@/accounts/modals/RecoverBalance'
import { ButtonSecondary } from '@/common/components/buttons'
import { useModal } from '@/common/hooks/useModal'
import { WorkingGroupApplication } from '@/working-groups/types/WorkingGroupApplication'

interface WithdrawApplicationButtonProps {
  application: WorkingGroupApplication
}

export const WithdrawApplicationButton = ({ application }: WithdrawApplicationButtonProps) => {
  const { showModal } = useModal()
  const stakingAccountBalance = useBalance(application.stakingAccount)
  const hasWGLock = stakingAccountBalance?.locks.some(({ type }) => type.endsWith('Worker')) ?? false
  const isWGLockRecoverable = useIsWGLockRecoverable(hasWGLock, application.stakingAccount)

  const withdrawApplication = useCallback(() => {
    if (isWGLockRecoverable) {
      const lock = stakingAccountBalance?.locks.find(({ type }) => type.endsWith('Worker'))
      showModal<RecoverBalanceModalCall>({
        modal: 'RecoverBalance',
        data: {
          address: application.stakingAccount,
          lock: lock as RecoverableLock,
          memberId: application.applicant.id,
          isWithdrawing: true,
        },
      })
    }
  }, [isWGLockRecoverable, application])

  if (!isWGLockRecoverable) {
    return null
  }

  return (
    <ButtonSecondary size="medium" onClick={withdrawApplication}>
      Withdraw
    </ButtonSecondary>
  )
}
