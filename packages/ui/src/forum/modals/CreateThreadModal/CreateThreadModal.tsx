import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo } from 'react'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useForumCategoryBreadcrumbs } from '@/forum/hooks/useForumCategoryBreadcrumbs'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { SwitchMemberModalCall } from '../../../memberships/modals/SwitchMemberModal'

import { CreateThreadModalCall } from '.'
import { CreateThreadDetailsModal } from './CreateThreadDetailsModal'
import { CreateThreadSignModal } from './CreateThreadSignModal'
import { CreateThreadSuccessModal } from './CreateThreadSuccessModal'
import { createThreadMachine } from './machine'

export const CreateThreadModal = () => {
  const { active: member } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const { showModal, hideModal, modalData } = useModal<CreateThreadModalCall>()
  const [state, send] = useMachine(createThreadMachine)
  const { api } = useApi()
  const { breadcrumbs } = useForumCategoryBreadcrumbs(modalData.categoryId)
  const balance = useBalance(member?.controllerAccount)

  const postDeposit = useMemo(() => api?.consts.forum.postDeposit.toBn(), [api])
  const threadDeposit = useMemo(() => api?.consts.forum.threadDeposit.toBn(), [api])

  const baseTransaction = api?.tx.forum.createThread(member?.id ?? 0, modalData.categoryId, '', '', null)
  const baseTransactionFee = useTransactionFee(member?.controllerAccount, baseTransaction)
  const minimumTransactionCost = useMemo(
    () => postDeposit && threadDeposit && baseTransactionFee?.transactionFee.add(postDeposit).add(threadDeposit),
    [postDeposit, threadDeposit, baseTransactionFee?.transactionFee.toString()]
  )

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (!member) {
        showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
      } else if (balance && minimumTransactionCost) {
        const canAfford = balance.transferable.gte(minimumTransactionCost)
        const controllerAccount = accountOrNamed(allAccounts, member.controllerAccount, 'Controller Account')
        canAfford && send({ type: 'PASS', memberId: member.id, categoryId: modalData.categoryId, controllerAccount })
        canAfford || send('FAIL')
      }
    }
  }, [state.value, member?.id, baseTransactionFee, postDeposit, threadDeposit])

  if (state.matches('generalDetails') && member) {
    return (
      <CreateThreadDetailsModal
        topic={state.context.topic ?? ''}
        description={state.context.description ?? ''}
        setTopic={(topic) => send({ type: 'SET_TOPIC', topic })}
        setDescription={(description) => send({ type: 'SET_DESCRIPTION', description })}
        onSubmit={() => send('NEXT')}
        breadcrumbs={breadcrumbs}
        author={member}
      />
    )
  }

  if (state.matches('transaction') && api) {
    const { memberId, categoryId, topic, description, controllerAccount } = state.context
    const transaction = api.tx.forum.createThread(memberId, categoryId, topic, description, null)
    const service = state.children.transaction
    return <CreateThreadSignModal transaction={transaction} service={service} controllerAccount={controllerAccount} />
  }

  if (state.matches('success')) {
    return <CreateThreadSuccessModal newThreadId={state.context.newThreadId.toString()} />
  }

  if (state.matches('error')) {
    return <FailureModal onClose={hideModal}>There was a problem with creating your forum thread.</FailureModal>
  }

  if (state.matches('requirementsFailed') && member && baseTransactionFee) {
    return (
      <InsufficientFundsModal
        onClose={hideModal}
        address={member.controllerAccount}
        amount={baseTransactionFee.transactionFee}
      />
    )
  }

  return null
}
