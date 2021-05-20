import React, { useState } from 'react'

import { Account } from '@/accounts/types'
import { FailureModal } from '@/common/components/FailureModal'
import { useModal } from '@/common/hooks/useModal'

import { ChangeRoleModalCall } from '.'
import { ChangeRoleAccountModal } from './ChangeRoleAccountModal'
import { ChangeRoleSignModal } from './ChangeRoleSignModal'
import { ChangeRoleSuccessModal } from './ChangeRoleSuccessModal'
import { Steps } from './constants'

export const ChangeRoleModal = () => {
  const { hideModal, modalData } = useModal<ChangeRoleModalCall>()
  const worker = modalData.worker
  const [step, setStep] = useState<Steps>(Steps.SELECT_ACCOUNT)
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(undefined)

  const onDone = (success: boolean) => {
    setStep(success ? Steps.SUCCESS : Steps.ERROR)
  }

  const onAccept = (account: Account) => {
    setSelectedAccount(account)
    setStep(Steps.SIGN_TRANSACTION)
  }

  switch (step) {
    case Steps.SELECT_ACCOUNT:
      return <ChangeRoleAccountModal onClose={hideModal} onAccept={onAccept} title="Change role account" />
    case Steps.SIGN_TRANSACTION:
      if (selectedAccount) {
        return (
          <ChangeRoleSignModal worker={worker} selectedAccount={selectedAccount} onDone={onDone} onClose={hideModal} />
        )
      }
      return null
    case Steps.SUCCESS:
      return <ChangeRoleSuccessModal onClose={hideModal} />
    default:
      return <FailureModal onClose={hideModal}>There was a problem changing the role.</FailureModal>
  }
}
