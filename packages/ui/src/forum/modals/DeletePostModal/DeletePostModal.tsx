import { useMachine } from '@xstate/react'
import React, { useEffect } from 'react'

import { WaitModal } from '@/common/components/WaitModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { usePostParents } from '@/memberships/hooks/usePostParents'

import { DeletePostModalCall } from '.'
import { deletePostMachine } from './machine'

export const DeletePostModal = () => {
  const {
    modalData: { post },
    hideModal,
  } = useModal<DeletePostModalCall>()

  const [state, send] = useMachine(deletePostMachine)

  const { active } = useMyMemberships()
  const { threadId, categoryId } = usePostParents(post.id)
  const { api } = useApi()

  useEffect(() => {
    if (!state.matches('requirementsVerification')) {
      return
    }
    if (active && active.id !== post.author.id) {
      send('FAIL')
      return
    }
    if (active && threadId && categoryId && api) {
      send('PASS')
      return
    }
  }, [threadId, categoryId, active?.id, api])

  if (state.matches('requirementsVerification')) {
    return <WaitModal title="Please wait..." description="Checking requirements" onClose={hideModal} />
  }

  if (state.matches('transaction') && threadId && categoryId) {
    const transaction = api?.tx.forum.deletePosts(post.author.id, [[categoryId, threadId, post.id, false]], '')
  }
  return null
}
