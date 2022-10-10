import React, { useEffect } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { EditThreadTitleModalCall } from '@/forum/modals/EditThreadTitleModal/index'
import { useMember } from '@/memberships/hooks/useMembership'

import { editThreadTitleMachine } from './machine'

export const EditThreadTitleModal = () => {
  const { api } = useApi()
  const [state] = useMachine(editThreadTitleMachine)
  const {
    modalData: { thread, newTitle, onSuccess },
  } = useModal<EditThreadTitleModalCall>()
  const { member: threadAuthor } = useMember(thread.authorId)

  useEffect(() => {
    if (state.matches('success')) {
      onSuccess(newTitle)
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
