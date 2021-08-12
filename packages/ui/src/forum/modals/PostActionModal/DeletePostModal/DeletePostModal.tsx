import { useMachine } from '@xstate/react'
import React, { useEffect } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { FailureModal } from '@/common/components/FailureModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { usePostParents } from '@/forum/hooks/usePostParents'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { postActionMachine } from '../postActionMachine'
import { PostActionSignModal } from '../PostActionSignModal'

import { DeletePostModalCall } from '.'

export const DeletePostModal = () => {
  const {
    modalData: { post },
    hideModal,
  } = useModal<DeletePostModalCall>()

  const [state, send] = useMachine(postActionMachine)

  const { active } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
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
    }
  }, [threadId, categoryId, active?.id, api])

  if (state.matches('requirementsVerification')) {
    return <WaitModal title="Please wait..." description="Checking requirements" onClose={hideModal} />
  }

  if (state.matches('transaction') && api && threadId && categoryId) {
    const transaction = api.tx.forum.deletePosts(post.author.id, [[categoryId, threadId, post.id, true]], '')
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, post.author.controllerAccount, 'Controller Account')
    return (
      <PostActionSignModal
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        actionText="You intend to delete your post."
      />
    )
  }

  if (state.matches('error')) {
    return <FailureModal onClose={hideModal}>There was a problem deleting your post.</FailureModal>
  }

  return null
}
