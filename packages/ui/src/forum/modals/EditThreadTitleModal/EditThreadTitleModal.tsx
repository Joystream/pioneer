import React, { useEffect } from 'react'

import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { EditThreadTitleSignModal } from '@/forum/modals/EditThreadTitleModal/EditThreadTitleSignModal'
import { EditThreadTitleModalCall } from '@/forum/modals/EditThreadTitleModal/index'

import { editThreadTitleMachine } from './machine'

export const EditThreadTitleModal = () => {
  const [state] = useMachine(editThreadTitleMachine)
  const {
    modalData: { thread, newTitle, onSuccess },
    hideModal,
  } = useModal<EditThreadTitleModalCall>()

  useEffect(() => {
    if (state.matches('success')) {
      onSuccess(newTitle)
    }
  }, [state.value])

  if (state.matches('transaction')) {
    const transactionService = state.children.transaction

    return (
      <EditThreadTitleSignModal onClose={hideModal} thread={thread} newTitle={newTitle} service={transactionService} />
    )
  }

  return null
}
