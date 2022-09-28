import React, { useEffect } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useMachine } from '@/common/hooks/useMachine'
import { Address } from '@/common/types'
import { toMemberTransactionParams } from '@/memberships/modals/utils'

import { InviteMemberFormModal } from './InviteMemberFormModal'
import { InviteMemberRequirementsModal } from './InviteMemberRequirementsModal'
import { InviteMemberSignModal } from './InviteMemberSignModal'
import { InviteMemberSuccessModal } from './InviteMemberSuccessModal'
import { inviteMemberMachine } from './machine'

interface MembershipModalProps {
  onClose: () => void
}

export function InviteMemberModal({ onClose }: MembershipModalProps) {
  const { api } = useApi()
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
    return <InviteMemberRequirementsModal onClose={onClose} />
  }

  if (state.matches('prepare')) {
    return <InviteMemberFormModal onClose={onClose} onSubmit={(params) => send({ type: 'DONE', form: params })} />
  }

  if (state.matches('transaction') && api) {
    const transaction = api.tx.members.inviteMember(toMemberTransactionParams(state.context.form))
    const transactionService = state.children.transaction

    return (
      <InviteMemberSignModal
        onClose={onClose}
        formData={state.context.form}
        signer={state.context.form.invitor?.controllerAccount as Address}
        service={transactionService}
        transaction={transaction}
      />
    )
  }

  if (state.matches('success')) {
    return <InviteMemberSuccessModal onClose={onClose} formData={state.context.form} />
  }

  return null
}
