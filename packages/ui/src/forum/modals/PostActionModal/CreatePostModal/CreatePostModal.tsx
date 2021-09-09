import { ForumPostMetadata } from '@joystream/metadata-protobuf'
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
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { postActionMachine } from '../postActionMachine'
import { PostActionSignModal } from '../PostActionSignModal'
import { PostActionSuccessModal } from '../PostActionSuccessModal'

import { CreatePostModalCall } from '.'

export const CreatePostModal = () => {
  const {
    modalData: { postText, thread },
    hideModal,
  } = useModal<CreatePostModalCall>()

  const [state, send] = useMachine(postActionMachine)

  const { active } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const { id: threadId, categoryId } = thread
  const { api } = useApi()

  const transaction = useMemo(
    () =>
      api &&
      active &&
      api.tx.forum.addPost(
        createType('ForumUserId', Number.parseInt(active.id)),
        categoryId,
        threadId,
        metadataToBytes(ForumPostMetadata, { text: postText }),
        false
      ),
    [api, threadId, categoryId, active]
  )

  const feeInfo = useTransactionFee(active?.controllerAccount, transaction)

  useEffect(() => {
    if (!state.matches('requirementsVerification')) {
      return
    }
    if (feeInfo && active) {
      feeInfo.canAfford && send('PASS')
      !feeInfo.canAfford && send('FAIL')
    }
  }, [state.value, JSON.stringify(feeInfo)])

  if (state.matches('requirementsVerification')) {
    return <WaitModal title="Please wait..." description="Checking requirements" onClose={hideModal} />
  }

  if (state.matches('transaction') && transaction && active) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, active.controllerAccount, 'Controller Account')
    return (
      <PostActionSignModal
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        action="create"
      />
    )
  }

  if (state.matches('error')) {
    return <FailureModal onClose={hideModal}>There was a problem posting your message.</FailureModal>
  }

  if (state.matches('success')) {
    return <PostActionSuccessModal onClose={hideModal} text="Your post has been submitted." />
  }

  if (state.matches('requirementsFailed') && active && feeInfo) {
    return (
      <InsufficientFundsModal onClose={hideModal} address={active.controllerAccount} amount={feeInfo.transactionFee} />
    )
  }

  return null
}
