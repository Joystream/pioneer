import React, { ReactNode, useCallback } from 'react'

import { ButtonSize, ButtonPrimary } from '@/common/components/buttons'
import { TransactionButtonWrapper } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { useOnBoarding } from '@/common/hooks/useOnBoarding'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'

interface AddMembershipButtonProps {
  className?: string
  children: ReactNode
  size: ButtonSize
}

export const AddMembershipButton = ({ className, children, size }: AddMembershipButtonProps) => {
  const { showModal } = useModal()
  const { isTransactionPending } = useTransactionStatus()
  const { status } = useOnBoarding()

  const openModal = useCallback(() => {
    showModal({ modal: status === 'finished' ? 'BuyMembership' : 'OnBoardingModal' })
  }, [status])

  return (
    <TransactionButtonWrapper>
      <ButtonPrimary onClick={openModal} className={className} size={size} disabled={isTransactionPending}>
        {children}
      </ButtonPrimary>
    </TransactionButtonWrapper>
  )
}
