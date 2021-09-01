import { createType } from '@joystream/types'
import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { FailureModal } from '@/common/components/FailureModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useForumPostParents } from '@/forum/hooks/useForumPostParents'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useProposalPostParents } from '@/proposals/hooks/useProposalPostParents'

import { postActionMachine } from '../postActionMachine'
import { PostActionSignModal } from '../PostActionSignModal'
import { PostActionSuccessModal } from '../PostActionSuccessModal'

import { DeletePostModalCall } from '.'

export const DeletePostModal = () => {
  const {
    modalData: { post, type },
    hideModal,
  } = useModal<DeletePostModalCall>()

  const [state, send] = useMachine(postActionMachine)

  const { active } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const forumPostData = useForumPostParents(type === 'forum' ? post.id : '')
  const proposalPostData = useProposalPostParents(type === 'proposal' ? post.id : '')
  const { api } = useApi()

  const transaction = useMemo(() => {
    if (api) {
      if (type === 'forum' && forumPostData.categoryId && forumPostData.threadId) {
        return api.tx.forum.deletePosts(
          createType('ForumUserId', Number.parseInt(post.author.id)),
          [[forumPostData.categoryId, forumPostData.threadId, post.id, true]],
          ''
        )
      }
      if (type === 'proposal' && proposalPostData.threadId) {
        return api.tx.proposalsDiscussion.deletePost(
          createType('ForumUserId', Number.parseInt(post.author.id)),
          post.id,
          proposalPostData.threadId,
          true
        )
      }
    }
  }, [api, JSON.stringify(forumPostData), JSON.stringify(proposalPostData), type])
  const feeInfo = useTransactionFee(active?.controllerAccount, transaction)

  useEffect(() => {
    if (!state.matches('requirementsVerification')) {
      return
    }
    if (transaction && feeInfo && active) {
      feeInfo.canAfford && send('PASS')
      !feeInfo.canAfford && send('FAIL')
    }
  }, [state.value, transaction, feeInfo?.canAfford])

  if (state.matches('requirementsVerification')) {
    return <WaitModal title="Please wait..." description="Checking requirements" onClose={hideModal} />
  }

  if (state.matches('transaction') && transaction) {
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

  if (state.matches('success')) {
    return <PostActionSuccessModal onClose={hideModal} text="The post has been deleted." />
  }

  if (state.matches('error')) {
    return <FailureModal onClose={hideModal}>There was a problem deleting your post.</FailureModal>
  }

  if (state.matches('requirementsFailed') && active && feeInfo) {
    return (
      <InsufficientFundsModal onClose={hideModal} address={active.controllerAccount} amount={feeInfo.transactionFee} />
    )
  }

  return null
}
