import React, { useEffect } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { EditThreadTitleModalCall } from '@/forum/modals/EditThreadTitleModal/index'

export const EditThreadTitleModal = () => {
  const { api } = useApi()
  const [state, send] = useMachine(
    defaultTransactionModalMachine(
      'There was a problem while saving thread title.',
      'You have just successfully edited thread title.'
    )
  )
  const {
    modalData: { thread, newTitle, onSuccess },
  } = useModal<EditThreadTitleModalCall>()
  const threadAuthor = thread.author

  useEffect(() => {
    if (state.matches('success')) {
      onSuccess(newTitle)
    }

    if (state.matches('requirementsVerification')) {
      send('PASS')
    }
  }, [state.value])

  if (state.matches('transaction') && threadAuthor) {
    return (
      <SignTransactionModal
        buttonText="Sign and save"
        transaction={api?.tx.forum.editThreadMetadata(threadAuthor.id, thread.categoryId, thread.id, newTitle)}
        signer={threadAuthor.controllerAccount}
        service={state.children.transaction}
      >
        <TextMedium>You intend to edit thread title.</TextMedium>
      </SignTransactionModal>
    )
  }

  return null
}
