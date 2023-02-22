import React, { useEffect } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { TextMedium } from '@/common/components/typography'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { Address } from '@/common/types'
import { toMemberTransactionParams } from '@/memberships/modals/utils'

import { InviteMemberFormModal } from './InviteMemberFormModal'
import { InviteMemberRequirementsModal } from './InviteMemberRequirementsModal'
import { InviteMemberSuccessModal } from './InviteMemberSuccessModal'
import { inviteMemberMachine } from './machine'

export function InviteMemberModal() {
  const { api } = useApi()
  const { hideModal } = useModal()
  const workingGroupBudget = useFirstObservableValue(
    () => api?.query.membershipWorkingGroup.budget(),
    [api?.isConnected]
  )
  const membershipPrice = useFirstObservableValue(() => api?.query.members.membershipPrice(), [api?.isConnected])
  const [state, send] = useMachine(inviteMemberMachine)

  useEffect(() => {
    if (state.matches('requirementsVerification') && workingGroupBudget && membershipPrice) {
      const isBudgetOK = workingGroupBudget.toBn().gte(membershipPrice.toBn())
      send(isBudgetOK ? 'PASS' : 'FAIL')
    }
  }, [workingGroupBudget, membershipPrice])

  if (state.matches('requirementsFailed')) {
    return <InviteMemberRequirementsModal onClose={hideModal} />
  }

  if (state.matches('prepare')) {
    return <InviteMemberFormModal onClose={hideModal} onSubmit={(params) => send({ type: 'DONE', form: params })} />
  }

  if (state.matches('transaction') && api) {
    const transaction = api.tx.members.inviteMember(toMemberTransactionParams(state.context.form))

    return (
      <SignTransactionModal
        buttonText="Sign and create a member"
        transaction={transaction}
        signer={state.context.form.invitor?.controllerAccount as Address}
        service={state.children.transaction}
      >
        <TextMedium>You intend to create a new membership.</TextMedium>
        <TextMedium>
          You are inviting this member. You have {state.context.form.invitor?.inviteCount.toString()} invites left.
        </TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('success')) {
    return <InviteMemberSuccessModal onClose={hideModal} formData={state.context.form} />
  }

  return null
}
