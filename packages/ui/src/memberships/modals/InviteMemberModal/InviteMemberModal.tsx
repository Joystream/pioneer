import React, { useEffect } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { TextMedium } from '@/common/components/typography'
import { WaitModal } from '@/common/components/WaitModal'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useMachine } from '@/common/hooks/useMachine'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { Address } from '@/common/types'
import { toMemberTransactionParams } from '@/memberships/modals/utils'

import { InviteMemberFormModal } from './InviteMemberFormModal'
import { InviteMemberRequirementsModal } from './InviteMemberRequirementsModal'
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

  if (state.matches('requirementsVerification')) {
    return <WaitModal onClose={onClose} title="Loading..." description="" />
  }

  if (state.matches('requirementsFailed')) {
    return <InviteMemberRequirementsModal onClose={onClose} />
  }

  if (state.matches('prepare')) {
    return <InviteMemberFormModal onClose={onClose} onSubmit={(params) => send({ type: 'DONE', form: params })} />
  }

  if (state.matches('transaction') && api) {
    const transaction = api.tx.members.inviteMember(toMemberTransactionParams(state.context.form))

    return (
      <SignTransactionModal
        buttonText="Sign and create a member"
        textContent={<TextMedium>You intend to create a new membership.</TextMedium>}
        transaction={transaction}
        signer={state.context.form.invitor?.controllerAccount as Address}
        onClose={onClose}
        service={state.children.transaction}
      />
    )
  }

  if (state.matches('success')) {
    return <InviteMemberSuccessModal onClose={onClose} formData={state.context.form} />
  }

  return null
}
