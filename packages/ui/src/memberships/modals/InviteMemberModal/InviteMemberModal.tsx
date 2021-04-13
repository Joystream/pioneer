import React, { useEffect, useMemo, useState } from 'react'

import { FailureModal } from '../../../common/components/FailureModal'
import { WaitModal } from '../../../common/components/WaitModal'
import { useApi } from '../../../common/hooks/useApi'
import { useObservable } from '../../../common/hooks/useObservable'
import { Address, ModalState } from '../../../common/types'
import { FormFields } from '../BuyMembershipModal/BuyMembershipFormModal'

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
  const [formData, setFormData] = useState<FormFields>()
  const onSubmit = (params: FormFields) => {
    setStep('AUTHORIZE')
    setFormData(params)
  }
  const onDone = (result: boolean) => setStep(result ? 'SUCCESS' : 'ERROR')

  const transaction = useMemo(
    () =>
      formData
        ? api?.tx?.members?.inviteMember({
            inviting_member_id: formData.invitor?.id,
            root_account: formData.rootAccount,
            controller_account: formData.controllerAccount,
            metadata: {
              name: formData.name,
              avatar_uri: formData.avatarUri,
              about: formData.about,
            },
            handle: formData.handle,
          })
        : undefined,
    [JSON.stringify(formData)]
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

  if (step == 'PREPARE' || !formData) {
    return <InviteMemberFormModal onClose={onClose} onSubmit={onSubmit} />
  }

  if (step === 'AUTHORIZE') {
    return (
      <InviteMemberSignModal
        onClose={onClose}
        formData={formData}
        signer={formData.invitor?.controllerAccount as Address}
        onDone={onDone}
        transaction={transaction}
      />
    )
  }

  if (step === 'SUCCESS') {
    return <InviteMemberSuccessModal onClose={onClose} formData={formData} />
  }

  return (
    <FailureModal onClose={onClose}>There was a problem with creating a membership for {formData.name}.</FailureModal>
  )
}
