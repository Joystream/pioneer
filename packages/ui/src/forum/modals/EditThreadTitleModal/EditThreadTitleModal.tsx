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
  const { modalData } = useModal<EditThreadTitleModalCall>()

  if (state.matches('transaction')) {
    const transactionService = state.children.transaction

    return (
      <EditThreadTitleSignModal
        onClose={modalData.onClose}
        thread={modalData.thread}
        newTitle={modalData.newTitle}
        service={transactionService}
      />
    )
  }

  if (state.matches('success')) {
    return <EditTreadTitleSuccessModal onClose={modalData.onClose} />
  }

  if (state.matches('error')) {
    return <FailureModal onClose={modalData.onClose}>There was a problem while saving thread title.</FailureModal>
  }

  return null
}
