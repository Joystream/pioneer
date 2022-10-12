import React, { useCallback } from 'react'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useGroupLocks } from '@/accounts/hooks/useGroupLocks/useGroupLocks'
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
  const { recoverable } = useGroupLocks(application.stakingAccount, stakingAccountBalance?.locks ?? [])

  const withdrawApplication = useCallback(() => {
    const lock = recoverable.find((lock) => lock.type.endsWith('Worker'))
    if (lock) {
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
  }, [recoverable.length, showModal, application])

  if (!recoverable.some((lock) => lock.type.endsWith('Worker'))) {
    return null
  }

  return (
    <ButtonSecondary size="medium" onClick={withdrawApplication}>
      Withdraw
    </ButtonSecondary>
  )
}
