import React, { useState, useMemo } from 'react'

import { Account } from '@/accounts/types'
import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useWorker } from '@/working-groups/hooks/useWorker'
import { getGroup } from '@/working-groups/model/getGroup'

import { ChangeAccountModalCall } from '.'
import { ChangeAccountSelectModal } from './ChangeAccountSelectModal'
import { ChangeAccountSignModal } from './ChangeAccountSignModal'
import { ChangeAccountSuccessModal } from './ChangeAccountSuccessModal'
import { ModalTypes, Steps } from './constants'

export const ChangeAccountModal = () => {
  const { api } = useApi()
  const { hideModal, modalData } = useModal<ChangeAccountModalCall>()
  const workerId = modalData.workerId
  const modalType = modalData.type
  const { worker } = useWorker(workerId)
  const [step, setStep] = useState<Steps>(Steps.SELECT_ACCOUNT)
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(undefined)

  const transaction = useMemo(() => {
    if (!selectedAccount || !worker) {
      return null
    }

    if (modalType === ModalTypes.CHANGE_ROLE_ACCOUNT) {
      return getGroup(api, worker.group.name)?.updateRoleAccount(worker.runtimeId, selectedAccount?.address)
    }

    return getGroup(api, worker.group.name)?.updateRewardAccount(worker.runtimeId, selectedAccount?.address)
  }, [selectedAccount?.address, worker?.id])

  const onDone = (success: boolean) => {
    setStep(success ? Steps.SUCCESS : Steps.ERROR)
  }

  const onAccept = (account: Account) => {
    setSelectedAccount(account)
    setStep(Steps.SIGN_TRANSACTION)
  }

  if (step === Steps.SELECT_ACCOUNT) {
    return (
      <ChangeAccountSelectModal
        title={modalType === ModalTypes.CHANGE_ROLE_ACCOUNT ? 'Change role account' : 'Change reward account'}
        buttonLabel="Change"
        onClose={hideModal}
        onAccept={onAccept}
      />
    )
  }

  if (step === Steps.SIGN_TRANSACTION) {
    if (!transaction || !worker) {
      return null
    }

    return (
      <ChangeAccountSignModal
        transaction={transaction}
        onClose={hideModal}
        onDone={onDone}
        worker={worker}
        title="The transaction can only be signed with the membership's controller account."
        buttonLabel={
          modalType === ModalTypes.CHANGE_ROLE_ACCOUNT
            ? 'Sign and change role account'
            : 'Sign and change reward account'
        }
      />
    )
  }

  if (step === Steps.SUCCESS) {
    return (
      <ChangeAccountSuccessModal onClose={hideModal}>
        {modalType === ModalTypes.CHANGE_ROLE_ACCOUNT
          ? 'You have successfully changed the role account.'
          : 'You have successfully changed the reward account.'}
      </ChangeAccountSuccessModal>
    )
  }

  return (
    <FailureModal onClose={hideModal}>
      {modalType === ModalTypes.CHANGE_ROLE_ACCOUNT
        ? 'There was a problem changing the role account.'
        : 'There was a problem changing the reward account.'}
    </FailureModal>
  )
}
