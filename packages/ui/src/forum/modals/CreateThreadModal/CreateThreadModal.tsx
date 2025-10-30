import { ForumThreadMetadata } from '@joystream/metadata-protobuf'
import React, { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { getFeeSpendableBalance } from '@/common/providers/transactionFees/provider'
import { useYupValidationResolver } from '@/common/utils/validation'
import { useForumCategoryBreadcrumbs } from '@/forum/hooks/useForumCategoryBreadcrumbs'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { CreateThreadModalCall } from '.'
import {
  CreateThreadDetailsModal,
  CreateThreadSchema,
  formDefaultValues,
  ThreadFormFields,
} from './CreateThreadDetailsModal'
import { CreateThreadSuccessModal } from './CreateThreadSuccessModal'
import { createThreadMachine, TransactionContext } from './machine'

export const CreateThreadModal = () => {
  const { active: member } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const { hideModal, modalData } = useModal<CreateThreadModalCall>()
  const [state, send] = useMachine(createThreadMachine)
  const { api, isConnected } = useApi()
  const { breadcrumbs } = useForumCategoryBreadcrumbs(modalData.categoryId)
  const balance = useBalance(member?.controllerAccount)

  const postDeposit = useMemo(() => api?.consts.forum.postDeposit.toBn(), [api])
  const threadDeposit = useMemo(() => api?.consts.forum.threadDeposit.toBn(), [api])

  const form = useForm<ThreadFormFields>({
    resolver: useYupValidationResolver(CreateThreadSchema),
    mode: 'onChange',
    defaultValues: formDefaultValues,
  })

  const { feeInfo } = useTransactionFee(
    member?.controllerAccount,
    () =>
      api?.tx.forum.createThread(
        member?.id ?? 0,
        modalData.categoryId,
        metadataToBytes(ForumThreadMetadata, {
          tags: [''],
          title: '',
        }),
        ''
      ),
    [member?.id, modalData.categoryId, isConnected, JSON.stringify(form.getValues())]
  )

  const minimumTransactionCost = useMemo(
    () => postDeposit && threadDeposit && feeInfo?.transactionFee.add(postDeposit).add(threadDeposit),
    [postDeposit, threadDeposit, feeInfo?.transactionFee.toString()]
  )

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (member && balance && minimumTransactionCost) {
        const canAfford = getFeeSpendableBalance(balance).gte(minimumTransactionCost)
        const controllerAccount = accountOrNamed(allAccounts, member.controllerAccount, 'Controller Account')
        canAfford && send({ type: 'PASS', memberId: member.id, categoryId: modalData.categoryId, controllerAccount })
        canAfford || send('FAIL')
      }
    }

    if (state.matches('beforeTransaction') && balance && minimumTransactionCost) {
      const canAfford = getFeeSpendableBalance(balance).gte(minimumTransactionCost)
      send(canAfford ? 'PASS' : 'FAIL')
    }
  }, [state.value, member?.id, minimumTransactionCost, balance])
  if (state.matches('generalDetails') && member) {
    return (
      <FormProvider {...form}>
        <CreateThreadDetailsModal breadcrumbs={breadcrumbs} author={member} send={send} />
      </FormProvider>
    )
  }

  if (state.matches('transaction') && api && postDeposit && threadDeposit && balance) {
    const { topic, description } = form.getValues()
    const { memberId, categoryId, controllerAccount } = state.context as TransactionContext
    const transaction = api.tx.forum.createThread(
      memberId,
      categoryId,
      metadataToBytes(ForumThreadMetadata, {
        tags: [''],
        title: topic,
      }),
      description
    )
    return (
      <SignTransactionModal
        transaction={transaction}
        signer={controllerAccount.address}
        service={state.children.transaction}
        additionalTransactionInfo={[
          { title: 'Thread creation and initial post deposit:', value: postDeposit.add(threadDeposit) },
        ]}
        extraCosts={postDeposit.add(threadDeposit)}
      >
        <TextMedium>You intend to create a thread.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('success')) {
    const { newThreadId } = state.context as Required<TransactionContext>
    return <CreateThreadSuccessModal newThreadId={newThreadId.toString()} />
  }

  if (state.matches('requirementsFailed') && member && minimumTransactionCost) {
    return (
      <InsufficientFundsModal onClose={hideModal} address={member.controllerAccount} amount={minimumTransactionCost} />
    )
  }

  return null
}
