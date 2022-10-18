import React, { useEffect } from 'react'

import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { EditThreadTitleSignModal } from '@/forum/modals/EditThreadTitleModal/EditThreadTitleSignModal'
import { EditThreadTitleModalCall } from '@/forum/modals/EditThreadTitleModal/index'

export const EditThreadTitleModal = () => {
  const [state, send] = useMachine(
    defaultTransactionModalMachine(
      'There was a problem while saving thread title.',
      'You have just successfully edited thread title.'
    )
  )

  const {
    modalData: { thread, newTitle, onSuccess },
    hideModal,
  } = useModal<EditThreadTitleModalCall>()

  useEffect(() => {
    if (state.matches('success')) {
      onSuccess(newTitle)
    }

    if (state.matches('requirementsVerification')) {
      send('PASS')
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
