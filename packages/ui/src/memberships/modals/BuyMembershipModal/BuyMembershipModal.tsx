import { useApolloClient } from '@apollo/client'
import React, { useEffect, useMemo } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { toMemberTransactionParams } from '@/memberships/modals/utils'

import { AddStakingAccCandidateModal } from './AddStakingAccCandidateModal'
import { BuyMembershipFormModal, MemberFormFields } from './BuyMembershipFormModal'
import { BuyMembershipSignModal } from './BuyMembershipSignModal'
import { BuyMembershipSuccessModal } from './BuyMembershipSuccessModal'
import { ConfirmStakingAccModal } from './ConfirmStakingAccModal'
import { buyMembershipMachine } from './machine'

export const BuyMembershipModal = () => {
  const { hideModal } = useModal()
  const { api } = useApi()

  const membershipPrice = useFirstObservableValue(() => api?.query.members.membershipPrice(), [api?.isConnected])
  const [state, send] = useMachine(buyMembershipMachine)
  const apolloClient = useApolloClient()

  const isSuccessful = state.matches('success')
  // refetch data after successful member creation
  useEffect(() => {
    if (!isSuccessful) return
    apolloClient.refetchQueries({ include: 'active' })
  }, [isSuccessful, apolloClient])

  const memberId = state.context.memberId?.toString()

  const buyTransaction = useMemo(
    () => state.context.form && api?.tx.members.buyMembership(toMemberTransactionParams(state.context.form)),
    [api?.isConnected, state.context.form]
  )
  const bindTransaction = useMemo(
    () => memberId && api?.tx.members.addStakingAccountCandidate(memberId),
    [api?.isConnected, memberId]
  )
  const conFirmTransaction = useMemo(() => {
    const validatorAccounts = state.context.form?.validatorAccounts

    if (!api || !memberId || !validatorAccounts) return

    const confirmTxs = validatorAccounts.map(({ address }) => api.tx.members.confirmStakingAccount(memberId, address))

    return confirmTxs.length > 1 ? api.tx.utility.batch(confirmTxs) : confirmTxs[0]
  }, [api?.isConnected, memberId, state.context.form?.validatorAccounts])

  if (state.matches('prepare')) {
    const onSubmit = (params: MemberFormFields) => send({ type: 'DONE', form: params })

    return <BuyMembershipFormModal onClose={hideModal} onSubmit={onSubmit} membershipPrice={membershipPrice} />
  }

  if (state.matches('buyMembershipTx') && buyTransaction) {
    const { form } = state.context
    const service = state.children.buyMembership

    return (
      <BuyMembershipSignModal
        onClose={hideModal}
        membershipPrice={membershipPrice}
        formData={form}
        transaction={buyTransaction}
        initialSigner={form.controllerAccount}
        service={service}
      />
    )
  }

  if (state.matches('addStakingAccCandidateTx') && bindTransaction && state.context.form.validatorAccounts) {
    const service = state.children.addStakingAccCandidate

    return (
      <AddStakingAccCandidateModal
        transaction={bindTransaction}
        signer={state.context.form.validatorAccounts[state.context.bindingValidtorAccStep ?? 0]}
        service={service}
      />
    )
  }

  if (state.matches('confirmStakingAccTx') && conFirmTransaction && state.context.form.controllerAccount) {
    const service = state.children.confirmStakingAcc
    return (
      <ConfirmStakingAccModal
        transaction={conFirmTransaction}
        signer={state.context.form.controllerAccount}
        service={service}
      />
    )
  }

  if (isSuccessful) {
    const { form, memberId } = state.context
    return <BuyMembershipSuccessModal onClose={hideModal} member={form} memberId={memberId?.toString()} />
  }

  return null
}
