import { useApolloClient } from '@apollo/client'
import React, { useEffect } from 'react'

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

  if (state.matches('prepare')) {
    const onSubmit = (params: MemberFormFields) =>
      send({ type: params.isValidator ? 'DONEWITHVAL' : 'DONE', form: params })

    return <BuyMembershipFormModal onClose={hideModal} onSubmit={onSubmit} membershipPrice={membershipPrice} />
  }

  if ((state.matches('buyMembershipTx') || state.matches('buyValidatorMembershipTx')) && api) {
    const transaction = api.tx.members.buyMembership(toMemberTransactionParams(state.context.form))
    const { form } = state.context
    const service = state.children.transaction

    return (
      <BuyMembershipSignModal
        onClose={hideModal}
        membershipPrice={membershipPrice}
        formData={form}
        transaction={transaction}
        initialSigner={form.controllerAccount}
        service={service}
      />
    )
  }

  if (
    state.matches('addStakingAccCandidateTx') &&
    api &&
    state.context.memberId &&
    state.context.form.validatorAccounts
  ) {
    const transaction = api.tx.members.addStakingAccountCandidate(state.context.memberId.toString())
    const service = state.children.transaction

    return (
      <AddStakingAccCandidateModal
        onClose={hideModal}
        formData={state.context.form}
        transaction={transaction}
        initialSigner={state.context.form.validatorAccounts[state.context.bindingValidtorAccStep ?? 0]}
        service={service}
      />
    )
  }

  if (state.matches('confirmStakingAccTx') && api && state.context.memberId && state.context.form.validatorAccounts) {
    const transaction = api.tx.utility.batch(
      state.context.form.validatorAccounts.map(({ address }) =>
        api.tx.members.confirmStakingAccount(state.context.memberId?.toString() ?? '', address)
      )
    )
    const service = state.children.transaction

    return (
      <ConfirmStakingAccModal
        onClose={hideModal}
        formData={state.context.form}
        transaction={transaction}
        initialSigner={state.context.form.controllerAccount}
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
