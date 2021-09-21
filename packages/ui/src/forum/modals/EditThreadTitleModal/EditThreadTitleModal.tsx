import { useMachine } from '@xstate/react'
import React, { useCallback } from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { useModal } from '@/common/hooks/useModal'
import { EditThreadTitleSignModal } from '@/forum/modals/EditThreadTitleModal/EditThreadTitleSignModal'
import { EditTreadTitleSuccessModal } from '@/forum/modals/EditThreadTitleModal/EditThreadTitleSuccessModal'
import { EditThreadTitleModalCall } from '@/forum/modals/EditThreadTitleModal/index'

import { editThreadTitleMachine } from './machine'

export const EditThreadTitleModal = () => {
  const [state] = useMachine(editThreadTitleMachine)
  const {
    modalData: { thread, newTitle, onSuccess },
    hideModal,
  } = useModal<EditThreadTitleModalCall>()

  const hideModalAfterSuccess = useCallback(() => {
    onSuccess(newTitle)
    hideModal()
  }, [])

  if (state.matches('transaction')) {
    const transactionService = state.children.transaction

    return (
      <EditThreadTitleSignModal onClose={hideModal} thread={thread} newTitle={newTitle} service={transactionService} />
    )
  }

  if (state.matches('success')) {
    return <EditTreadTitleSuccessModal onClose={hideModalAfterSuccess} />
  }

  if (state.matches('error')) {
    return <FailureModal onClose={hideModal}>There was a problem while saving thread title.</FailureModal>
  }

  return null
}
