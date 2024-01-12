import React, { useMemo } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { UpdateMembershipModalCall } from '@/memberships/modals/UpdateMembershipModal/index'
import { createBatch } from '@/memberships/modals/UpdateMembershipModal/utils'

import { useMyMemberships } from '../../hooks/useMyMemberships'

import { updateMembershipMachine } from './machine'
import { UpdateMembershipFormModal } from './UpdateMembershipFormModal'
import { UpdateMembershipSuccessModal } from './UpdateMembershipSuccessModal'

export const UpdateMembershipModal = () => {
  const { api } = useApi()
  const { active } = useMyMemberships()
  const {
    hideModal,
    modalData: { member },
  } = useModal<UpdateMembershipModalCall>()
  const [state, send] = useMachine(updateMembershipMachine)

  const unbondValidatorAccTransaction = useMemo(
    () => api?.tx.members.removeStakingAccount(member.id),
    [api?.isConnected]
  )

  const bondValidatorAccTransaction = useMemo(
    () => api?.tx.members.addStakingAccountCandidate(member.id),
    [api?.isConnected]
  )

  const conFirmTransaction = useMemo(() => {
    const validatorAccounts = state.context.form?.validatorAccounts

    if (!api || !validatorAccounts) return

    const confirmTxs = validatorAccounts.map((address) => api.tx.members.confirmStakingAccount(member.id, address))

    return confirmTxs.length > 1 ? api.tx.utility.batch(confirmTxs) : confirmTxs[0]
  }, [api?.isConnected, state.context.form?.validatorAccounts])

  const updateMembershipTransaction = useMemo(
    () => state.context.form && createBatch(state.context.form, api, member),
    [api?.isConnected, state.context.form]
  )

  if (state.matches('prepare')) {
    return (
      <UpdateMembershipFormModal
        onClose={hideModal}
        onSubmit={(params, memberId, controllerAccount) => send('DONE', { form: params, memberId, controllerAccount })}
        member={member}
      />
    )
  }

  if (state.matches('removeStakingAccTx') && unbondValidatorAccTransaction) {
    if (
      !state.context.form.validatorAccountsToBeRemoved ||
      state.context.form.validatorAccountsToBeRemoved.length === 0
    ) {
      send('SKIP_UNBONDING')
      return null
    }
    return (
      <SignTransactionModal
        buttonText="Sign and unbond"
        transaction={unbondValidatorAccTransaction}
        signer={state.context.form.validatorAccountsToBeRemoved[state.context.unbondingValidatorAccStep ?? 0]}
        service={state.children.removeStakingAcc}
      >
        <TextMedium>You intend to remove the validator account from your membership.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('addStakingAccCandidateTx') && bondValidatorAccTransaction) {
    if (!state.context.form.validatorAccounts || state.context.form.validatorAccounts.length === 0) {
      send('SKIP_BONDING')
      return null
    }
    return (
      <SignTransactionModal
        buttonText="Sign and bond"
        transaction={bondValidatorAccTransaction}
        signer={state.context.form.validatorAccounts[state.context.bondingValidatorAccStep ?? 0]}
        service={state.children.addStakingAccCandidate}
      >
        <TextMedium>You intend to to bond new validator account with your membership.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('confirmStakingAccTx') && conFirmTransaction) {
    return (
      <SignTransactionModal
        buttonText="Sign and confirm"
        transaction={conFirmTransaction}
        signer={member.controllerAccount}
        service={state.children.confirmStakingAcc}
      >
        <TextMedium>You intend to confirm your validator account to be bound with your membership.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('updateMembershipTx')) {
    if (!updateMembershipTransaction) {
      send('SKIP_UPDATE_MEMBERSHIP')
      return null
    }
    return (
      <SignTransactionModal
        buttonText="Sign and update a member"
        transaction={updateMembershipTransaction}
        signer={member.controllerAccount}
        service={state.children.updateMembership}
      >
        <TextMedium>You intend to update your membership.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (active && state.matches('success')) {
    return <UpdateMembershipSuccessModal onClose={hideModal} member={active} />
  }

  return null
}
