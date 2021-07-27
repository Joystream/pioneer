import { useMachine } from '@xstate/react'
import React, { useEffect } from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
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
  const workingGroupBudget = useObservable(api.query.membershipWorkingGroup.budget(), [])
  const membershipPrice = useObservable(api.query.members.membershipPrice(), [])
  const [state, send] = useMachine(inviteMemberMachine)

  useEffect(() => {
    if (state.matches('requirementsVerification') && workingGroupBudget && membershipPrice) {
      const isBudgetOK = workingGroupBudget.toBn().gte(membershipPrice.toBn())
      send(isBudgetOK ? 'PASS' : 'FAIL')
    }
  }, [workingGroupBudget, membershipPrice])

  if (state.matches('requirementsVerification')) {
    return <WaitModal onClose={onClose} title="Loading..." description="" />
  }

  if (state.matches('requirementsFailed')) {
    return <InviteMemberRequirementsModal onClose={onClose} />
  }

  if (state.matches('prepare')) {
    return <InviteMemberFormModal onClose={onClose} onSubmit={(params) => send({ type: 'DONE', form: params })} />
  }

  if (state.matches('transaction')) {
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

  if (state.matches('error')) {
    return (
      <FailureModal onClose={onClose}>
        There was a problem with creating a membership for {state.context.form.name}.
      </FailureModal>
    )
  }

  return null
}
