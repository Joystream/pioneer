import { useMachine } from '@xstate/react'
import React from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { useModal } from '@/common/hooks/useModal'
import { EditThreadTitleSignModal } from '@/forum/modals/EditThreadTitleModal/EditThreadTitleSignModal'
import { EditTreadTitleSuccessModal } from '@/forum/modals/EditThreadTitleModal/EditThreadTitleSuccessModal'
import { EditThreadTitleModalCall } from '@/forum/modals/EditThreadTitleModal/index'

import { editThreadTitleMachine } from './machine'

export const EditThreadTitleModal = () => {
  const [state] = useMachine(editThreadTitleMachine)
  const {
    modalData: { thread, newTitle, onSuccessfulEdit, onFailedEdit },
    hideModal,
  } = useModal<EditThreadTitleModalCall>()

  const hideModalWithAction = (isSuccess?: boolean) => {
    if (isSuccess) {
      onSuccessfulEdit(newTitle)
    } else {
      onFailedEdit()
    }

    hideModal()
  }

  if (state.matches('transaction')) {
    const transactionService = state.children.transaction

    return (
      <EditThreadTitleSignModal
        onClose={() => hideModalWithAction()}
        thread={thread}
        newTitle={newTitle}
        service={transactionService}
      />
    )
  }

  if (state.matches('success')) {
    return <EditTreadTitleSuccessModal onClose={() => hideModalWithAction(true)} />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={() => hideModalWithAction()}>There was a problem while saving thread title.</FailureModal>
    )
  }

  return null
}
