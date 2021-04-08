import React, { useEffect, useMemo, useState } from 'react'

import { FailureModal } from '../../../common/components/FailureModal'
import { WaitModal } from '../../../common/components/WaitModal'
import { useApi } from '../../../common/hooks/useApi'
import { useObservable } from '../../../common/hooks/useObservable'
import { Address, ModalState } from '../../../common/types'
import { Member } from '../../types'

import { InviteMemberFormModal } from './InviteMemberFormModal'
import { InviteMemberRequirementsModal } from './InviteMemberRequirementsModal'
import { InviteMemberSignModal } from './InviteMemberSignModal'
import { InviteMemberSuccessModal } from './InviteMemberSuccessModal'

interface MembershipModalProps {
  onClose: () => void
}

export function InviteMemberModal({ onClose }: MembershipModalProps) {
  const { api } = useApi()
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
    return <InviteMemberRequirementsModal onClose={onClose} />
  }

  if (step == 'PREPARE' || !transactionParams) {
    return <InviteMemberFormModal onClose={onClose} onSubmit={onSubmit} />
  }

  if (step === 'AUTHORIZE') {
    return (
      <InviteMemberSignModal
        onClose={onClose}
        transactionParams={transactionParams}
        signer={transactionParams.invitor?.controllerAccount as Address}
        onDone={onDone}
        transaction={transaction}
      />
    )
  }

  if (step === 'SUCCESS') {
    return <InviteMemberSuccessModal onClose={onClose} member={transactionParams} />
  }

  return (
    <FailureModal onClose={onClose}>
      There was a problem with creating a membership for {transactionParams.name}.
    </FailureModal>
  )
}
