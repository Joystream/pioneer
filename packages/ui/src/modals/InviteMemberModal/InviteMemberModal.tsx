import React, { useMemo, useState } from 'react'
import { Member, ModalState } from '../../common/types'
import { useAccounts } from '../../hooks/useAccounts'
import { useApi } from '../../hooks/useApi'
import { AddMembershipFailureModal } from '../AddMembershipModal/AddMembershipFailureModal'
import { AddMembershipSuccessModal } from '../AddMembershipModal/AddMembershipSuccessModal'
import { SignCreateMemberModal } from '../AddMembershipModal/SignCreateMemberModal'
import { InviteFormModal } from './InviteFormModal'

interface MembershipModalProps {
  onClose: () => void
}

export function InviteMemberModal({ onClose }: MembershipModalProps) {
  const { api } = useApi()
  const { allAccounts } = useAccounts()
  const [step, setStep] = useState<ModalState>('PREPARE')
  const [transactionParams, setParams] = useState<Member>()
  const onSubmit = (params: Member) => {
    setStep('AUTHORIZE')
    setParams(params)
  }

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

  if (step == 'PREPARE' || !transactionParams) {
    return <InviteFormModal onClose={onClose} onSubmit={onSubmit} />
  }

  const onDone = (result: boolean) => setStep(result ? 'SUCCESS' : 'ERROR')
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
