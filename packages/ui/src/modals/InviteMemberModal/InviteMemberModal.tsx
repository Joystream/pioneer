import React, { useEffect, useMemo, useState } from 'react'
import { Member, ModalState } from '../../common/types'
import { useAccounts } from '../../hooks/useAccounts'
import { useApi } from '../../hooks/useApi'
import { useObservable } from '../../hooks/useObservable'
import { AddMembershipFailureModal } from '../AddMembershipModal/AddMembershipFailureModal'
import { AddMembershipSuccessModal } from '../AddMembershipModal/AddMembershipSuccessModal'
import { SignCreateMemberModal } from '../AddMembershipModal/SignCreateMemberModal'
import { WaitModal } from '../WaitModal'
import { InviteFormModal } from './InviteFormModal'
import { WorkingGroupBudgetModal } from './WorkingGroupBudgetModal'

interface MembershipModalProps {
  onClose: () => void
}

export function InviteMemberModal({ onClose }: MembershipModalProps) {
  const { api } = useApi()
  const { allAccounts } = useAccounts()
  const [step, setStep] = useState<ModalState>('REQUIREMENTS_CHECK')
  const [transactionParams, setParams] = useState<Member>()
  const onSubmit = (params: Member) => {
    setStep('AUTHORIZE')
    setParams(params)
  }
  const onDone = (result: boolean) => setStep(result ? 'SUCCESS' : 'ERROR')

  const transaction = useMemo(
    () =>
      transactionParams
        ? api?.tx?.members?.inviteMember({
            inviting_member_id: transactionParams.invitor?.id,
            root_account: transactionParams.rootAccount.address,
            controller_account: transactionParams.controllerAccount.address,
            metadata: {
              name: transactionParams.name,
              avatar_uri: transactionParams.avatarUri,
              about: transactionParams.about,
            },
            handle: transactionParams.handle,
          })
        : undefined,
    [JSON.stringify(transactionParams)]
  )
  const workingGroupBudget = useObservable(api?.query.membershipWorkingGroup.budget(), [])
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])

  useEffect(() => {
    if (step === 'REQUIREMENTS_CHECK' && workingGroupBudget && membershipPrice) {
      const isBudgetOK = workingGroupBudget.toBn().gte(membershipPrice.toBn())

      setStep(isBudgetOK ? 'PREPARE' : 'REQUIREMENTS_FAIL')
    }
  }, [workingGroupBudget, membershipPrice])

  if (step === 'REQUIREMENTS_CHECK') {
    return <WaitModal onClose={onClose} title="Loading..." description="" />
  }

  if (step === 'REQUIREMENTS_FAIL') {
    return <WorkingGroupBudgetModal onClose={onClose} />
  }

  if (step == 'PREPARE' || !transactionParams) {
    return <InviteFormModal onClose={onClose} onSubmit={onSubmit} />
  }

  const initialSigner =
    allAccounts.find((a) => a.address == transactionParams.invitor?.controllerAccount) ||
    transactionParams.controllerAccount

  if (step === 'AUTHORIZE') {
    return (
      <SignCreateMemberModal
        onClose={onClose}
        transactionParams={transactionParams}
        onDone={onDone}
        transaction={transaction}
        initialSigner={initialSigner}
        isInvite
      />
    )
  }

  if (step === 'SUCCESS') {
    return <AddMembershipSuccessModal onClose={onClose} member={transactionParams} />
  }
  return <AddMembershipFailureModal onClose={onClose} member={transactionParams} />
}
