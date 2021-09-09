import { ForumPostMetadata } from '@joystream/metadata-protobuf'
import { createType } from '@joystream/types'
import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo } from 'react'

import { useBalance } from '@/accounts/hooks/useBalance'
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
import { PostActionSuccessModal } from '../PostActionSuccessModal'

import { CreatePostModalCall } from '.'
import { CreatePostSignModal } from './CreatePostSignModal'

export const CreatePostModal = () => {
  const {
    modalData: { postText, thread, isEditable },
    hideModal,
  } = useModal<CreatePostModalCall>()

  const [state, send] = useMachine(postActionMachine)

  const { active } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const { id: threadId, categoryId } = thread
  const balance = useBalance(active?.controllerAccount)
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
        isEditable
      ),
    [api, threadId, categoryId, active]
  )

  const postDeposit = api?.consts.forum.postDeposit.toBn()

  const feeInfo = useTransactionFee(active?.controllerAccount, transaction)

  useEffect(() => {
    if (!state.matches('requirementsVerification')) {
      return
    }
    if (feeInfo && postDeposit && active && balance) {
      const canAfford = isEditable
        ? balance.transferable.gte(feeInfo.transactionFee.add(postDeposit))
        : feeInfo.canAfford
      canAfford && send('PASS')
      !canAfford && send('FAIL')
    }
  }, [state.value, JSON.stringify(feeInfo), postDeposit, balance])

  if (state.matches('requirementsVerification')) {
    return <WaitModal title="Please wait..." description="Checking requirements" onClose={hideModal} />
  }

  if (state.matches('transaction') && transaction && active && postDeposit) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, active.controllerAccount, 'Controller Account')
    return (
      <CreatePostSignModal
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        author={active}
        postText={postText}
        isEditable={isEditable}
        postDeposit={postDeposit}
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
